// HELPER
import { getMenuItems } from "../helpers/menu";

// COMPONENT
import Scrollbar from "../components/Scrollbar"

import AppMenu from "./Menu";

// SIDEBAR CONTENT
const SideBarContent = () => {
    return (
        <>
            <div id="ap__sidebar-menu">
                <AppMenu menuItems={getMenuItems()} />
            </div>

            <div className="clearfix" />
        </>
    );
};

const LeftSidebar = () => {
    return (
        <div className="ap__left-side-menu">
            <Scrollbar style={{ maxHeight: '100%' }}>
                <SideBarContent />
            </Scrollbar>
        </div>
    )
}

export default LeftSidebar