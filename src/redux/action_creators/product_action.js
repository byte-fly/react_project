import { SAVE_PROD_LISt } from "../action_types";

export const creatSaveProductAction=(value)=>{
    return {type:SAVE_PROD_LISt,data:value}
}