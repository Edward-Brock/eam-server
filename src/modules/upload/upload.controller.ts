import { Controller, Post, UseInterceptors, UploadedFile, Get, Res, UploadedFiles, Body, Query } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import type { Response, query } from 'express';
import { zip } from 'compressing';
import { createWriteStream } from 'fs';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  /**
   * 上传单个文件
   * @param file 
   * @returns 
   */
  @Post('file')
  // UseInterceptors 处理文件的中间件，file 是一个标识名
  @UseInterceptors(FileInterceptor('file'))
  // UploadedFile 装饰器是用于读取文件的
  uploadFile(@UploadedFile() file) {
    console.log("file：", file);
    return {
      code: 200,
      state: 'success',
      message: '文件上传成功',
      file
    };
  }

  /**
   * 同时上传多个文件
   * @param files 
   * @param body 
   * @returns 
   */
  @Post('files')
  @UseInterceptors(FilesInterceptor('file'))
  addFiles(@UploadedFiles() files, @Body() body) {
    for (const file of files) {
      const writeImage =
        createWriteStream(join(__dirname, '../../public/file', `${body.name}-${Date.now()}-${file.originalname}`));
      writeImage.write(file.buffer);
    }
    return files.buffer;
  }

  /**
   * 获取并下载单个文件
   * @param res 
   */
  @Get('file')
  downloadFile(@Res() res: Response, @Query() query: object) {
    let key = 'fileURL';
    console.log(__dirname, query[key]);
    const url = join(query[key]); // 正常开发中 url 应该是从数据库中的
    res.download(url); // 将指定路径的文件作为附件传输给浏览器
  }

  /**
   * 获取文件流下载
   * compressing 用于压缩和解压缩文件和流，支持 gzip、deflate、zip、tar、tgz、tbz2 等格式
   * @param res 
   */
  @Get('fileFlow')
  getImg(@Res() res: Response) {
    const url = join(__dirname, '../../public/file/1684115786334.png'); // 正常开发中 url 应该是从数据库中的

    const targetStream = new zip.Stream(); // 创建一个可读的压缩流, 可以将任何数据压缩成 zip 格式
    targetStream.addEntry(url); // 向压缩流中添加文件

    res.setHeader('Content-Type', 'application/octet-stream'); // 设置文件格式为 '流'
    res.setHeader(
      'Content-Disposition', // 设置文件以什么方式呈现
      'attachment; filename=superman',
      // attachment 表示文件应该被下载到本地；filename=superman 表示下载文件的文件名
    );

    targetStream.pipe(res); // 将压缩流输出给响应流
  }
}
