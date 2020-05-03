export class DynamicForm {
    constructor(
        public formName: string,
        public key: string,
        public fields: any[],
        public error: DynamicFormError, // to show no of errors for specific formname
        // this is shown only after submit if errors present
        public description?: string


    ) { }
}



export class DynamicFormFields {
    constructor(
        public key: string,
        public label: string,
        public value: any,
        public controlType: string,
        public fields: DynamicFormFields[],
        public description?: string,
        public options?: any[] | string,
        public type?: string,
        public unit?: string,
        public sequence?: number,
        public rowspan?: number,
        public colspan?: number,
        public style?: any,
        public readonly?: boolean,
        public styleClass?: string,
        public validators?: any,
        public dependency?: any[],
        public formName?: string,
        public subFormName?: string

    ) { }
}

export class DynamicFormFieldsValidators {
    constructor(
        public min?: number,
        public max?: number,
        public required?: boolean | { key: string, value: string, exist: boolean }[],
        public email?: string,
        public pattern?: string
    ) { }
}

export class DynamicFormError {
    constructor(
        public count: number,
        public field: DynamicFormErrorMsg[]
    ) { }
}

export class DynamicFormErrorMsg {
    constructor(
        public label: string,
        public message: string,
        public field: DynamicFormErrorMsg[]
    ) { }
}


