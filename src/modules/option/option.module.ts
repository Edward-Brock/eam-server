import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionEntity } from './entities/option.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([OptionEntity]), HttpModule],
  controllers: [OptionController],
  providers: [OptionService],
  exports: [OptionService]
})
export class OptionModule { }
