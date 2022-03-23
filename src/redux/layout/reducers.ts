// CONSTANTS
import {
    LayoutTypes,
} from '../../constants/layout';

// ACTIONS
import { LayoutActionType } from './actions';

// ACTIONCONSTANTS
import { LayoutActionTypes, LayoutStateTypes } from './constants';

const INIT_STATE = {
    layoutType: LayoutTypes.LAYOUT_VERTICAL,
};

const Layout = (state: LayoutStateTypes = INIT_STATE, action: LayoutActionType<string | boolean | null>) => {
    switch (action.type) {
        case LayoutActionTypes.CHANGE_LAYOUT:
            return {
                ...state,
                layoutType: action.payload,
            };
        default:
            return state;
    }
};

export default Layout;
