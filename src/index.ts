import FormBuilder from './formBuilder/FormBuilder.vue';

export type { IForm, GenericObject, EventMap } from './formBuilder/shared/interfaces';
export default {
    install: (app: any) => {
        app.component("FormBuilder", FormBuilder);
    }
};