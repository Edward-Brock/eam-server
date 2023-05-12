import { Injectable } from '@nestjs/common';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OptionEntity } from './entities/option.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionEntity)
    private optionRepository: Repository<OptionEntity>,
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) { }

  create(createOptionDto: CreateOptionDto) {
    return this.optionRepository.save(createOptionDto);
  }

  findAll() {
    return this.optionRepository.find();
  }

  /**
   * 获取系统当前运行状态
   * run —— 200
   * maintenance —— 503
   * stop —— 423
   * @returns object
   */
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

  /**
   * 通过临时微信 CODE 换取对应 OPENID 和 SESSION
   * @param query 传入的微信 CODE
   * @returns object
   */
  getCodeToSession(query: object) {
    const APPID = this.configService.get('APPID')
    const SECRET = this.configService.get('SECRET')
    const GRANT_TYPE = this.configService.get('GRANT_TYPE')
    // 将上述值与临时 CODE 结合传送至微信服务器获取当前 OPENID 和 SESSION
    return new Promise((resolve) => {
      this.httpService.get(this.configService.get('WECHAT_API'), {
        params: {
          appid: APPID,
          secret: SECRET,
          js_code: query['js_code'],
          grant_type: GRANT_TYPE
        }
      })
        .pipe(map((res) => res.data))
        .subscribe((data) => {
          resolve(data);
        });
    });
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
