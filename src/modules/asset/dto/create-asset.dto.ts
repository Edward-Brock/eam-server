import { AssetState } from "../entities/asset.entity";

export class CreateAssetDto {
    asset_id: number;
    code: string;
    type: string;
    name: string;
    price: number;
    purchase_time: Date;
    retirement_time: Date;
    description: Date;
    state: AssetState;
    del_flag: boolean;
    create_by: string;
    create_time: Date;
    update_by: string;
    update_time: Date;
    delete_time: Date;
}
