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
}
