import { SAVE_TITLE } from "../action_types";

export const creatSaveTitleAction=(value)=>{
    return {type:SAVE_TITLE,data:value}
}