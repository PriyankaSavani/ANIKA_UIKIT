import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";

// constants
import { MenuItemTypes } from "../constants/menu";

// HELPERS
import { findAllParent } from "../helpers/menu";

type SubMenus = {
    item: MenuItemTypes;
    linkClassName?: string;
    subMenuClassNames?: string;
    activeMenuItems?: Array<string>;
    toggleMenu?: (item: MenuItemTypes, status: boolean) => void;
    className?: string;
};

const MenuItemLink = ({ item, className }: SubMenus) => {
    return (
        <Link
            to={item.url!}
            target={item.target}
            className={
                classNames(
                    'ap__side-nav-link-ref', 
                    'ap__side-sub-nav-link', 
                    className
                )
            }
            data-menu-key={item.key}
        >
            {item.icon && <i className={item.icon} />}
            {item.badge && (
                <span className={
                    classNames(
                        'badge', 
                        'bg-' + item.badge.variant, 
                        'rounded-pill', 
                        'float-end'
                    )
                }>
                    {item.badge.text}
                </span>
            )}
            <span> {item.label} </span>
        </Link>
    );
};

const MenuItem = ({ item, className, linkClassName }: SubMenus) => {
    return (
        <li className={
            classNames(
                'ap__side-nav-item', 
                className
            )
        }>
            <MenuItemLink item={item} className={linkClassName} />
        </li>
    );
};

const MenuItemWithChildren = ({ item, linkClassName, subMenuClassNames, activeMenuItems, toggleMenu }: SubMenus) => {

    const [open, setOpen] = useState<boolean>(activeMenuItems!.includes(item.key));

    useEffect(() => {
        setOpen(activeMenuItems!.includes(item.key));
    }, [activeMenuItems, item]);

    const toggleMenuItem = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const status = !open;
        setOpen(status);
        if (toggleMenu) toggleMenu(item, status);
        return false;
    };

    return (
        <li className={
            classNames(
                'ap__side-nav-item', 
                { 'ap__menuitem-active': open }
            )
        }>
            <Link
                to="#"
                onClick={toggleMenuItem}
                data-menu-key={item.key}
                aria-expanded={open}
                className={
                    classNames(
                        'ap__has-arrow', 
                        'ap__side-sub-nav-link', 
                        linkClassName, 
                        { 'ap__menuitem-active': activeMenuItems!.includes(item.key) ? 'ap__active' : '' }
                    )
                }
            >
                {item.icon && <i className={item.icon} />}
                {!item.badge ? (
                    <span className="ap__menu-arrow"></span>
                ) : (
                    <span className={
                        classNames(
                            'badge', 
                            'bg-' + item.badge.variant, 
                            'rounded-pill', 
                            'float-end'                            
                        )
                    }>
                        {item.badge.text}
                    </span>
                )}
                <span> {item.label} </span>
            </Link>
            <Collapse in={open}>
                <div>
                    <ul className={classNames(subMenuClassNames)}>
                        {(item.children || []).map((child, i) => {
                            return (
                                <React.Fragment key={i}>
                                    {child.children ? (
                                        <>
                                            {/* PARENT */}
                                            <MenuItemWithChildren
                                                item={child}
                                                linkClassName={activeMenuItems!.includes(child.key) ? 'ap__active' : ''}
                                                activeMenuItems={activeMenuItems}
                                                subMenuClassNames="ap__side-nav-third-level"
                                                toggleMenu={toggleMenu}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {/* CHILD */}
                                            <MenuItem
                                                item={child}
                                                className={
                                                    activeMenuItems!.includes(child.key) ? 'ap__menuitem-active' : ''
                                                }
                                                linkClassName={activeMenuItems!.includes(child.key) ? 'ap__active' : ''}
                                            />
                                        </>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </ul>
                </div>
            </Collapse>
        </li>
    );
};

type AppMenuProps = {
    menuItems: MenuItemTypes[];
};

const AppMenu = ({ menuItems }: AppMenuProps) => {

    const menuRef: any = useRef(null);

    const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);

    // TOGGLE MENU
    const toggleMenu = (menuItem: MenuItemTypes, show: boolean) => {
        if (show) setActiveMenuItems([menuItem['key'], ...findAllParent(menuItems, menuItem)]);
    };

    return (
        <ul className="ap__side-menu" ref={menuRef} id="ap__side-menu">
            {(menuItems || []).map((item, idx) => {
                return (
                    <React.Fragment key={idx}>
                        {item.isTitle ? (
                            <li
                                className={
                                    classNames(
                                        'ap__menu-title', 
                                        {'mt-2': idx !== 0}
                                    )
                                }
                            >
                                {item.label}
                            </li>
                        ) : (
                            <>
                                {item.children ? (
                                    <MenuItemWithChildren
                                        item={item}
                                        toggleMenu={toggleMenu}
                                        subMenuClassNames="ap__nav-second-level"
                                        activeMenuItems={activeMenuItems}
                                        linkClassName="ap__side-nav-link"
                                    />
                                ) : (
                                    <MenuItem
                                        item={item}
                                        linkClassName="ap__side-nav-link"
                                        className={activeMenuItems!.includes(item.key) ? 'ap__menuitem-active' : ''}
                                    />
                                )}
                            </>
                        )}
                    </React.Fragment>
                );
            })}
        </ul>
    )
}

export default AppMenu