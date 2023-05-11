import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('option')
export class OptionEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        comment: '设置表ID'
    })
    option_id: number;

    @Column({
        comment: '设置名称'
    })
    option_name: string;

    @Column({
        comment: '设置值'
    })
    option_value: string;
}
