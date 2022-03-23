import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

// LAYOUTS
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';

// COMPONENTS
import PrivateRoute from './PrivateRoute';
import Root from './Root';

// CONSTANTS
import { LayoutTypes } from '../constants';

// HOOKS
import { useRedux } from '../hooks';

// LAZY LOAD ALL THE VIEWS
// AUTH PAGES
const Login = React.lazy(() => import('../pages/auth/Login'));

// DASHBOARDS
const DashBoard1 = React.lazy(() => import('../pages/dashboards/DashBoard1/'));

const loading = () => <div className=""></div>;

type LoadComponentProps = {
    component: React.LazyExoticComponent<() => JSX.Element>;
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
    <Suspense fallback={loading()}>
        <Component />
    </Suspense>
);

const AllRoutes = () => {
    const { appSelector } = useRedux();

    const { layout } = appSelector((state) => ({
        layout: state.Layout,
    }));

    const getLayout = () => {
        let layoutCls: React.ComponentType = VerticalLayout;

        switch (layout.layoutType) {
            case LayoutTypes.LAYOUT_VERTICAL:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    };
    let Layout = getLayout();

    return useRoutes([
        { path: '/', element: <Root /> },
        {
            // PUBLIC ROUTES
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    path: 'auth',
                    children: [
                        { path: 'login', element: <LoadComponent component={Login} /> },
                    ],
                },
            ],
        },
        {
            // AUTH PROTECTED ROUTES
            path: '/',
            element: <PrivateRoute roles={'Admin'} component={Layout} />,
            children: [
                {
                    path: 'dashboard',
                    element: <LoadComponent component={DashBoard1} />,
                },
            ],
        },
    ]);
};

export { AllRoutes };
