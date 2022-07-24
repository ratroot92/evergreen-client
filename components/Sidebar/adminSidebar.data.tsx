import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';

const adminSidebarData = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: <AiIcons.AiFillHome color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,
  },
  {
    title: 'Users',
    path: '/admin/user',
    icon: <FaIcons.FaCartPlus color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,
    subNav: [
      {
        title: 'Add User',
        path: '/admin/user/add',
        icon: <FaIcons.FaCartPlus color="white" />,
        iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
        iconOpened: <RiIcons.RiArrowUpSFill color="white" />,
      },
      {
        title: 'All Users',
        path: '/admin/user/all',
        icon: <FaIcons.FaCartPlus color="white" />,
        iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
        iconOpened: <RiIcons.RiArrowUpSFill color="white" />,
      },
    ],
  },
  {
    title: 'Products',
    path: '/admin/product',
    icon: <FaIcons.FaCartPlus color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,
    subNav: [
      {
        title: 'Add Product',
        path: '/admin/product/add',
        icon: <FaIcons.FaCartPlus color="white" />,
        iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
        iconOpened: <RiIcons.RiArrowUpSFill color="white" />,
      },
      {
        title: 'All Products',
        path: '/admin/product/all',
        icon: <FaIcons.FaCartPlus color="white" />,
        iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
        iconOpened: <RiIcons.RiArrowUpSFill color="white" />,
      },
    ],
  },
  {
    title: 'Categroies',
    path: '/admin/category',
    icon: <FaIcons.FaListAlt color="white" />,
    iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
    iconOpened: <RiIcons.RiArrowUpSFill color="white" />,
    subNav: [
      {
        title: 'Add Category',
        path: '/admin/category/add',
        icon: <FaIcons.FaListAlt color="white" />,
        iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
        iconOpened: <RiIcons.RiArrowUpSFill color="white" />,
      },
      {
        title: 'All Categories',
        path: '/admin/category/all',
        icon: <FaIcons.FaListAlt color="white" />,
        iconClosed: <RiIcons.RiArrowDownSFill color="white" />,
        iconOpened: <RiIcons.RiArrowUpSFill color="white" />,
      },
    ],
  },
];

export default adminSidebarData;
