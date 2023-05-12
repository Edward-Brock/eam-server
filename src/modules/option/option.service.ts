import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionEntity } from './entities/option.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionEntity)
    private optionRepository: Repository<OptionEntity>,
  ) { }

  create(createOptionDto: CreateOptionDto) {
    return this.optionRepository.save(createOptionDto);
  }

  findAll() {
    return this.optionRepository.find();
  }

  findOne(id: number) {
    return this.optionRepository.findOneBy({ option_id: id });
  }

  update(id: string, updateOptionDto: UpdateOptionDto) {
    return this.optionRepository.update({ option_name: id }, updateOptionDto);
  }

  remove(id: number) {
    return this.optionRepository.delete(id);
  }

  async getSystemState() {
    const system_state = await this.optionRepository.findOneBy({ option_name: 'eam_state' })
    if (system_state.option_value === 'run') {
      // 数据库中 eam_state 值为 run 时表示 eam 正常运行
      return {
        code: 200,
        state: 'success',
        message: 'EAM 系统运行正常',
        time: new Date()
      };
    } else if (system_state.option_value === 'maintenance') {
      return {
        code: 503,
        state: 'warning',
        message: 'EAM 系统处于维护模式',
        time: new Date()
      };
    } else {
      return {
        code: 423,
        state: 'warning',
        message: 'EAM 系统处于关闭模式',
        time: new Date()
      };
    }


  }
}
