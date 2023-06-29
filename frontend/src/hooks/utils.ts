import { IStateValues, IFormArgs, IDispatchArgs } from "../types/hooks/useForm";
import { DateValue } from "@mantine/dates";
import { Reducer } from "react";

export function getStateValues<T extends Object>(values: T): IStateValues<T> {
    return (Object.keys(values) as string[]) // Get keys of object as array of strings
    .reduce((acc: IStateValues<T>, key: string) => {
        acc[key] = {
            value: values[key as keyof T],
            error: null
        }
        return acc;
    }, {} as IStateValues<T>);
}

export function callAllFields<T>(callback: Function, state: IStateValues<T>): Function {
    return () => {
        (Object.keys(state) as string[])
        .forEach((key: string) => {
            callback(key as keyof T);
        });
    }
}

//gets next state of form after validation without updating state
export function getNextState<T extends Object>(
    reducer: Reducer<IStateValues<T>, IDispatchArgs<T>>,
    state: IStateValues<T>, 
    validate: IFormArgs<T>["validate"]
): IStateValues<T> {
    return (Object.keys(state) as string[])
    .reduce((acc: IStateValues<T>, key: string) => {
        const value = state[key].value;
        const error = validate[key as keyof T](value);
        const currState = reducer(state, {
            field: key as keyof T,
            value,
            error,
            type: "VALIDATE"
        });


        acc[key] = currState[key as keyof IStateValues<T>];

        return acc;
    }, {} as IStateValues<T>);
}

export function checkAllFields<T extends Object>(state: IStateValues<T>): boolean {
    return (Object.keys(state) as string[])
    .every((key: string) => {
        return state[key as any].error === null;
    });
}

export function getOnChange<T>(
    dispatch: React.Dispatch<IDispatchArgs<T>>, 
    field: keyof T
): (e: React.ChangeEvent<unknown> | DateValue | undefined) => void {
    return (e: React.ChangeEvent<unknown> | DateValue | undefined) => {
        if (e !== null &&typeof e === 'object' && 'nativeEvent' in e) {
            const { currentTarget } = e;
            if(
                currentTarget instanceof HTMLInputElement ||
                currentTarget instanceof HTMLTextAreaElement ||
                currentTarget instanceof HTMLSelectElement
            ) {
                dispatch({
                    field,
                    value: currentTarget.value as T[keyof T],
                    error: null,
                    type: "UPDATE"
                });
            }
        } else {
            dispatch({
                field,
                value: e as T[keyof T],
                error: null,
                type: "UPDATE"
            });
        }
    } 
}