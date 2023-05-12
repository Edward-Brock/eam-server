import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) { }

  @Post()
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.create(createAssetDto);
  }

  // @Get()
  // findAll() {
  //   return this.assetService.findAll();
  // }

  /**
   * 获取所有资产统计金额
   * @returns object
   */
  @Get('getPrice/:asset_type')
  getPrice(@Param('asset_type') asset_type: string) {
    return this.assetService.getPrice(asset_type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetService.update(id, updateAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetService.remove(id);
  }
}
