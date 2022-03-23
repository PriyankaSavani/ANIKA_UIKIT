export type MenuItemTypes = {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: MenuItemTypes[];
};

const MENU_ITEMS: MenuItemTypes[] = [
    { key: 'navigation', label: 'Navigation', isTitle: true },
    {
        key: 'dashboard',
        label: 'Dashboard',
        isTitle: false,
        icon: 'bi-house-door',
        badge: { variant: 'success', text: '9+' },
        url: '/dashboard',
    },
    { key: 'components', label: 'Components', isTitle: true},
    {
        key: 'base-ui',
        label: 'Base UI',
        isTitle: false,
        icon: 'bi-box',
        children: [
            {
                key: 'base-ui-buttons',
                label: 'Buttons',
                url: '/base-ui/buttons',
                parentKey: 'base-ui',
            },
        ],
    },
    {
        key: 'extended-ui',
        label: 'Extended UI',
        isTitle: false,
        icon: 'bi-box2',
        children: [
            {
                key: 'base-ui-buttons',
                label: 'Buttons',
                url: '/base-ui/buttons',
                parentKey: 'base-ui',
            },
        ],
    }
];

export { MENU_ITEMS };
