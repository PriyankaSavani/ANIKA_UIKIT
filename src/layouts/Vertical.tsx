import React, { Suspense, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

// CONSTANTS
import { LayoutTypes } from '../constants';

// UTILS
import { changeBodyAttribute } from '../utils';

// code splitting and lazy loading
const LeftSidebar = React.lazy(() => import('./LeftSidebar'));
const Footer = React.lazy(() => import('./Footer'));

const loading = () => <div className=""></div>;

const VerticalLayout = () => {

    useEffect(() => {
        changeBodyAttribute('data-layout-mode', LayoutTypes.LAYOUT_VERTICAL);
    }, []);

    return (
        <>
            <div id="ap__wrapper">
                <Suspense fallback={loading()}>

                </Suspense>
                <Suspense fallback={loading()}>
                    <LeftSidebar />
                </Suspense>
                <div className="ap__content-page">
                    <div className="ap__content">
                        <Container fluid>
                            <Outlet />
                        </Container>
                    </div>

                    <Suspense fallback={loading()}>
                        <Footer />
                    </Suspense>
                </div>
            </div>
            <Suspense fallback={loading()}>

            </Suspense>
        </>
    );
};

export default VerticalLayout;
