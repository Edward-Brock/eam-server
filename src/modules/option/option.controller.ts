import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';

@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) { }

  @Post()
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  // @Get()
  // findAll() {
  //   return this.optionService.findAll();
  // }

  /**
   * 获取系统状态
   * @returns object
   */
  @Get('getSystemState')
  getSystemState() {
    return this.optionService.getSystemState();
  }

  /**
   * 通过微信 CODE 换取 SESSION 
   * @returns object
   */
  @Get('getCodeToSession')
  getCodeToSession(@Query() query: object) {
    return this.optionService.getCodeToSession(query);
  }

  @Get('getOption')
  findOne(@Query() query: object) {
    return this.optionService.findOne(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionService.update(id, updateOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionService.remove(+id);
  }
}
