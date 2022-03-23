// CONSTANTS
import {
    LayoutTypes,
} from '../../constants/layout';

enum LayoutActionTypes {
    CHANGE_LAYOUT = '@@layout/CHANGE_LAYOUT',
}

export type LayoutStateTypes = {
    layoutType: LayoutTypes.LAYOUT_VERTICAL;
};

export { LayoutActionTypes };
