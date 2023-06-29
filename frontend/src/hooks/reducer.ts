import { Reducer } from "react";
import { IStateValues, IDispatchArgs } from "../types/hooks/useForm";

export function getReducer<T extends Object>() : any {
    const reducer: Reducer<IStateValues<T>, IDispatchArgs<T>> = (
        state, 
        { field, value, error, type }
    ) => {
        switch (type) {
            case "UPDATE":
                return {
                    ...state,
                    [field]: {
                        value: value as T[keyof T],
                        error: null
                    }
                };
            case "VALIDATE":
                return {
                    ...state,
                    [field]: {
                        value: state[field as string].value,
                        error: error as string
                    }
                };
            default:
                return state;
        }
    };

    return reducer;
}
