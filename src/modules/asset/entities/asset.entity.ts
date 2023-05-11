import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// 设备状态枚举
export enum AssetState {
    // 未使用
    UNUSED = "unused",
    // 使用中
    USING = "using",
    // 已停用
    DEACTIVATE = 'deactivate',
    // 报废
    WRECK = 'wreck'
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
        comment: '资产类型',
        nullable: true
    })
    type: string;

    @Column({
        comment: '资产品牌',
        nullable: true
    })
    brand: string;

    @Column({
        comment: '资产名称'
    })
    name: string;

    @Column({
        comment: '资产价格，保留小数点后两位',
        type: 'decimal',
        precision: 10,
        scale: 2
    })
    price: number;

    @Column({
        comment: '是否涉密标志',
        default: false
    })
    secret_flag: boolean

    @Column({
        comment: '资产购入时间'
    })
    purchase_time: Date;

    @Column({
        comment: '资产报废时间',
        nullable: true
    })
    retirement_time: Date;

    @Column({
        comment: '资产备注',
        type: 'text',
        nullable: true
    })
    description: Date;

    @Column({
        comment: '资产状态',
        type: 'enum',
        enum: AssetState,
        default: AssetState.UNUSED
    })
    state: AssetState;

    @Column({
        comment: '设备删除标记',
        default: false
    })
    delete_flag: boolean;

    @Column({
        comment: '资产设备创建者'
    })
    create_by: string;

    @CreateDateColumn({
        comment: '资产设备创建日期',
    })
    create_time: Date;

    @Column({
        comment: '资产设备更新者'
    })
    update_by: string;

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
}
