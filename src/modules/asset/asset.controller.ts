import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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
   * 获取资产统计金额
   * @returns object
   */
  @Get('getAssetPrice/:asset_type')
  getAssetPrice(@Param('asset_type') asset_type: string) {
    return this.assetService.getAssetPrice(asset_type);
  }

  /**
   * 获取资产统计个数
   * @returns object
   */
  @Get('getAssetNumber')
  getAssetNumber(@Query() query: object) {
    return this.assetService.getAssetNumber(query);
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
