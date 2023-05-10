import { AssetEntity } from "src/modules/asset/entities/asset.entity";
import { Entity, BaseEntity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";

// 性别枚举
export enum UserGender {
    MALE = "male",
    FEMALE = "female"
}

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: '用户表ID'
    })
    user_id: number;

    @Column({
        comment: '用户真实姓名'
    })
    name: string;

    @Column({
        comment: '用户性别',
        type: 'enum',
        enum: UserGender,
        nullable: true
    })
    gender: UserGender;

    @Column({
        comment: '用户微信 SESSION KEY'
    })
    session_key: string;

    @Column({
        comment: '用户微信 OPENID'
    })
    openid: string;

    @Column({
        comment: '用户微信昵称',
        nullable: true,
    })
    nickname: string;

    @Column({
        comment: '用户微信头像',
        nullable: true,
    })
    avatar: string;

    @Column({
        comment: '用户绑定电话号',
        nullable: true,
    })
    tel: string;

    @Column({
        comment: '管理员标志',
        default: false
    })
    manage_flag: boolean;

    @Column({
        comment: '用户账号当前状态：1-未启用；2-正常；3-锁定；',
        default: 1
    })
    state: number;

    @Column({
        comment: '用户删除状态：默认为假',
        default: false
    })
    del_flag: boolean;

    @CreateDateColumn({
        comment: '数据创建日期',
    })
    create_time: Date;

    @UpdateDateColumn({
        comment: '数据更新日期',
        nullable: true,
    })
    update_time: Date;

    @DeleteDateColumn({
        comment: '数据删除日期',
        nullable: true,
    })
    delete_time: Date;

    @OneToMany(() => AssetEntity, asset => asset.code)
    asset: AssetEntity;
}
