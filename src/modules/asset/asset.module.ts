import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetEntity } from './entities/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssetEntity])],
  controllers: [AssetController],
  providers: [AssetService],
  exports: [AssetService]
})
export class AssetModule { }
