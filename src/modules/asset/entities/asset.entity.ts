import { UserEntity } from "src/modules/user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// 设备状态枚举
export enum AssetState {
    UNUSED = "unused",
    USING = "using"
}

@Entity('asset')
export class AssetEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: '资产表ID'
    })
    asset_id: number;

    @Column({
        comment: '资产条码'
    })
    code: string;

    @Column({
        comment: '资产类型'
    })
    type: string;

    @Column({
        comment: '资产名称'
    })
    name: string;

    @Column({
        comment: '资产价格',
        type: "decimal"
    })
    price: number;

    @Column({
        comment: '资产购入时间'
    })
    purchase_time: Date;

    @Column({
        comment: '资产报废时间'
    })
    retirement_time: Date;

    @Column({
        comment: '资产备注'
    })
    description: Date;

    @Column({
        comment: '资产状态',
        type: 'enum',
        enum: AssetState
    })
    state: AssetState;

    @Column({
        comment: '设备删除标记',
        default: false
    })
    del_flag: boolean;

    @CreateDateColumn({
        comment: '资产设备创建日期',
    })
    create_time: Date;

    @UpdateDateColumn({
        comment: '资产设备更新日期',
        nullable: true,
    })
    update_time: Date;

    @DeleteDateColumn({
        comment: '资产设备删除日期',
        nullable: true,
    })
    delete_time: Date;

    @ManyToOne(() => UserEntity, user => user.openid)
    @JoinColumn({ name: 'create_by' })
    user: UserEntity;
}
