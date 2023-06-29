import { Reducer, useReducer } from "react";
import { IStateValues, IFormArgs, IDispatchArgs, IUseFormReturnType } from "../types/hooks/useForm";
import { getReducer } from "./reducer";
import { 
    getStateValues, 
    callAllFields, 
    getNextState, 
    checkAllFields, 
    getOnChange 
} from "./utils";

export default function useForm<T extends object>({ 
    initialValues,
    validate
}: IFormArgs<T>) : IUseFormReturnType {
    const values: T = initialValues;    
    const reducer: Reducer<IStateValues<T>, IDispatchArgs<T>> = getReducer<T>();
    const stateValues: IStateValues<T> = getStateValues<T>(values);

    const [state, dispatch] = useReducer(reducer, stateValues);

    function resetField(field: keyof T): void {
        dispatch({
            field,
            value: initialValues[field],
            error: null,
            type: "UPDATE"
        });
    };

    const resetAll = callAllFields<T>(resetField, state);

    function validateField (field: keyof T): void {
        const value = state[field as string].value;
        const error = validate[field](value);

        if(error !== null) {
            dispatch({
                field,
                value: null,
                error,
                type: "VALIDATE"
            });
        }
    };

    const validateAll = callAllFields<T>(validateField, state);

    function isValid(): boolean {
        const nextState: IStateValues<T> = getNextState<T>(reducer, state, validate);
        const isValid: boolean = checkAllFields<T>(nextState);
        
        return isValid;
    };

    function getInputProps(field: keyof T) {
        const value = state[field as string].value;
        const error: string | null = state[field as string].error;

        return {
            value,
            error,
            onChange: getOnChange<T>(dispatch, field)
        };

    };

    const getValues = () : T => {
        const values = 
            (Object.keys(state) as string[])
            .reduce((acc: T, key: string) => {
                acc[key as keyof T] = state[key as keyof IStateValues<T>].value;
                return acc;
            }, {} as T);

        return values;
    };

    return {
        getValues,
        getInputProps,
        validateField,
        validateAll,
        isValid,
        resetField,
        resetAll
    } as IUseFormReturnType;
}