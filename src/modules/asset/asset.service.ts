import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssetEntity, AssetState } from './entities/asset.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(AssetEntity)
    private assetRepository: Repository<AssetEntity>,
  ) { }

  async create(createAssetDto: CreateAssetDto) {
    const asset_code_search = await this.assetRepository.findOneBy({ code: createAssetDto.code });
    console.log('asset_code_search ->', asset_code_search);
    if (asset_code_search) {
      // 存在资产，返回错误
      return {
        code: 412,
        state: 'error',
        message: '当前资产 CODE 已存在'
      }
    } else {
      // 当前资产不存在，执行创建操作
      createAssetDto.create_time = createAssetDto.update_time = new Date();
      let asset_info = await this.assetRepository.save(createAssetDto);
      return {
        code: 200,
        state: 'success',
        message: '基于资产 CODE 的资产信息创建成功',
        data: asset_info
      }
    }
  }

  findAll() {
    return this.assetRepository.find();
  }

  findOne(id: string) {
    return this.assetRepository.findOneBy({ code: id });
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return this.assetRepository.update(id, updateAssetDto);
  }

  async remove(id: string) {
    let del_info = await this.findOne(id);
    del_info.state = AssetState.DEACTIVATE;
    del_info.delete_flag = true;
    del_info.delete_time = new Date();
    console.log(del_info);
    return this.assetRepository.update(id, del_info);
  }
}
