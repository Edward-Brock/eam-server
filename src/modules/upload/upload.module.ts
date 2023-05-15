import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

// 配置文件上传
const multerOptions: MulterOptions = {
  // 配置文件的存储
  storage: diskStorage({
    // 存储地址
    destination: join(__dirname, '../../public/images'), // 存放的文件路径
    // 存储名称
    filename: (req, file, callback) => {
      const suffix = extname(file.originalname); // 获取文件后缀
      const docName = new Date().getTime(); // 自定义文件名
      return callback(null, `${docName}${suffix}`);
    }
  }),
  // 过滤存储的文件
  fileFilter: (_req, file, callback) => {
    // multer 默认使用 latin1 编码来解析文件名, 而 latin1 编码不支持中文字符, 所以会出现中文名乱码的现象
    // 这里将文件名从 latin1 编码转换为 Buffer 对象, 再用 toString('utf8') 将 Buffer 对象转换为 utf8 编码的字符串
    // utf8 是一种支持多国语言的编码方式, 这样就可以保证文件名的中文字符不会被错误解析
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    callback(null, true);
  },
  // 限制文件大小
  limits: {
    // 限制文件大小为 10 MB
    fileSize: 10 * 1024 * 1024, // 默认无限制
    // 限制文件名长度为 50 bytes
    fieldNameSize: 50, // 默认 100 bytes
  }
};

@Module({
  imports: [MulterModule.register(multerOptions),],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule { }
