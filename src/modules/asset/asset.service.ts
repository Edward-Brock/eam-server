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

  /**
   * 通过传入的 asset_type 值进行筛选，并返回对应的金额
   * @param asset_type 传入需要筛选获得的值
   * @returns object
   */
  async getAssetPrice(query: object) {
    // 将 query 中添加 delete_flag 为假的未删除标记
    query['delete_flag'] = false;
    let assets_all_price: number = 0;
    const get_assets = await this.assetRepository.findAndCountBy(query);
    let [assets_info, assets_length] = get_assets;

    for (let index = 0; index < assets_length; index++) {
      assets_all_price += +assets_info[index].price;
    }

    return {
      code: 200,
      state: 'success',
      message: '资产金额获取成功',
      type: query,
      data: assets_all_price
    };
  }

  /**
   * 通过传入的 asset_type 值进行筛选，并返回对应的资产个数
   * @param asset_type 传入需要筛选获得的值
   * @returns object
   */
  async getAssetNumber(query: object) {
    const assets_info = await this.assetRepository.findAndCountBy(query);
    return {
      code: 200,
      state: 'success',
      message: '资产金额获取成功',
      type: query,
      data: assets_info
    };
  }

  findOne(id: string) {
    return this.assetRepository.findOneBy({ code: id });
  }

  update(id: string, updateAssetDto: UpdateAssetDto) {
    updateAssetDto.update_time = new Date();
    return this.assetRepository.update({ code: id }, updateAssetDto);
  }

  async remove(id: string) {
    /**
     * 使用软删除，对del_flag进行标记，将delete_time置为当前时间
     * 0-false（未删除）；1-true（已删除）；
     */
    let del_info = await this.assetRepository.findOneBy({ code: id });
    del_info.state = AssetState.DEACTIVATE;
    del_info.delete_flag = true;
    del_info.delete_time = new Date();
    console.log(del_info);
    if (this.assetRepository.update({ code: id }, del_info)) return {
      code: 200,
      state: 'success',
      message: '资产删除成功'
    }
  }
}
