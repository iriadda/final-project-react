import {IUser} from "./IUser.ts";
import {IRecipe} from "./IRecipe.ts";

export type IResponseModelType = {
    total: number;
    skip: number;
    limit: number;
    users: IUser[];
    recipes:IRecipe[]
}
