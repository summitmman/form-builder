export type GenericObject<T=any> = {[key: string]: T};
export type Widgets<T = Function> = Array<IWidget<T> | string>;

export interface IWidget<T = Function> {
    id: string;
    type: string;
    props?: GenericObject;
    events?: GenericObject<T>;
    children?: Widgets<T>;
}

export interface IForm {
    id: string;
    children: Widgets<string>;
}