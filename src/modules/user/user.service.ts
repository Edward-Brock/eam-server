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

  create(createUserDto: CreateUserDto) {
    createUserDto.create_time = createUserDto.update_time = new Date();
    return this.userRepository.save(createUserDto);
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
    let del_info = await this.findOne(id);
    /**
     * 使用软删除，对del_flag进行标记
     * 0-false（未删除）；1-true（已删除）；
     * 对将要删除的用户进行判断，如果manage_flag为真则为主管理用户，拒绝删除
     * 如果为普通用户执行软删除操作，对del_flag进行标记，将delete_time置为当前时间
     */
    if (del_info.manage_flag) {
      return {
        code: 417,
        state: 'error',
        message: '具有管理权限的主管理用户无法删除'
      }
    }
    del_info.delete_time = new Date();
    del_info.del_flag = true;
    return this.userRepository.update(id, del_info)
  }
}
