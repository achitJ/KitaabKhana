export interface IFormArgs<T> {
    initialValues: T;
    validate: {
        [K in keyof T]: (value: T[K]) => string | null
    }
};

export interface IStateValues<T> {
    [key: string]: {
        value: T[keyof T];
        error: string | null;
    }
};

export interface IDispatchArgs<T> {
    field: keyof T;
    value: T[keyof T] | null;
    error: string | null;
    type: "UPDATE" | "VALIDATE";
};

export type IUseFormReturnType = {
    getValues: Function,
    getInputProps: Function,
    validateField: Function,
    validateAll: Function,
    isValid: Function,
    resetField: Function,
    resetAll: Function
}