export type IResponseModelType = {
    total: number;
    skip: number;
    limit: number;
    users: IUser[];
    recipes:IRecipe[]
}
