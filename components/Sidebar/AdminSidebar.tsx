import React from 'react';
import Navbar from './Navbar';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import Link from 'next/link';
import styled from 'styled-components';
import adminSidebarData from './adminSidebar.data';
import cssClasses from './AdminSidebar.module.css';

const SubMenu = ({ item }: any) => {
  const [subnav, setSubnav] = React.useState(false);
  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
    <Link href={item.path}>
      <a
        onClick={item.subNav && showSubnav}
        className={`${cssClasses.sidebarLink}`}
      >
        <div>
          {item.icon}
          <span className={`${cssClasses.sidebarLabel}`}>{item.title}</span>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </a>
      </Link>
      {subnav && item.subNav.map((subItem:any) => {
        return (
          <React.Fragment key={subItem.path}>
          <Link  href={subItem.path}>
            <div className={`${cssClasses.subSidebarLink}`}>
              <span>{subItem.icon}</span>
              <span>{subItem.title}</span>
            </div>
            </Link>
            </React.Fragment>
        )
      })}
      </>
  );
};

const AdminSidebar = () => {
  return (
    <div className={`${cssClasses.sidebarNav}`}>
      <nav className={`${cssClasses.sidebarNav}`}>
        <div>
          <Link href="#">
            <a className={`${cssClasses.navIcon}`}>
              <FaIcons.FaBars size={22} color="white" />
              <span>Evergreen</span>
            </a>
          </Link>
          {adminSidebarData.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })}
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
