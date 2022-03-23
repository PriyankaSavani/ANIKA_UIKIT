// CONSTANTS
import { LayoutActionTypes } from './constants';

export type LayoutActionType<TPayload> = {
    type:
        | LayoutActionTypes.CHANGE_LAYOUT
    payload?: TPayload;
};

export const changeLayout = (layout: string): LayoutActionType<string> => ({
    type: LayoutActionTypes.CHANGE_LAYOUT,
    payload: layout,
});
