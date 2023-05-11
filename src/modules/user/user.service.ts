import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const openid_search = await this.userRepository.findOneBy({ openid: createUserDto.openid });
    console.log('openid_search ->', openid_search);
    if (openid_search) {
      // 存在账号，返回错误
      return {
        code: 412,
        state: 'error',
        message: '当前用户 OPENID 已存在'
      }
    } else {
      // 当前帐号不存在，进行创建操作
      createUserDto.create_time = createUserDto.update_time = new Date();
      let create_info = await this.userRepository.save(createUserDto);
      return {
        code: 200,
        state: 'success',
        message: '基于用户 OPENID 的账号创建成功',
        data: create_info
      }
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ openid: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    let del_info = await this.userRepository.findOneBy({ openid: id });
    /**
     * 使用软删除，对del_flag进行标记
     * 0-false（未删除）；1-true（已删除）；
     * 对将要删除的用户进行判断，如果manage_flag为真则为主管理用户，拒绝删除
     * 如果为普通用户执行软删除操作，对del_flag进行标记，将delete_time置为当前时间
     */
    if (del_info.user_type === 'root') {
      return {
        code: 417,
        state: 'error',
        message: '具有管理权限的主管理用户无法删除'
      }
    }
    del_info.state = 3;
    del_info.delete_time = new Date();
    del_info.delete_flag = true;
    if (this.userRepository.update({ openid: id }, del_info)) return {
      code: 200,
      state: 'success',
      message: '注销成功'
    }
  }
}
