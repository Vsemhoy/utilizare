import { HomeOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import MenuItem from 'antd/es/menu/MenuItem';
import React, { useEffect, useState } from 'react';
import { HTTP_ROOT } from '../../../config/config';
import { Link, NavLink, useLocation  } from 'react-router-dom';

const AppMenuUt = (props) => {
    const location = useLocation();
    const selectedKey = location.pathname;
  return (
    <div>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        className={'sk-main-menu'}
      >
        {/* Первая группа */}
       


       <Menu mode="horizontal" style={{ background: '#00000000', flex: 1}}
       selectedKeys={[selectedKey]}>
          <Menu.Item key="home" icon={<HomeOutlined  style={{ fontSize: '20px', color: '#3b3b3b', marginTop: '6px',
           textAlign: 'center', paddingLeft: '6px' }} />} ><a href={HTTP_ROOT}></a></Menu.Item>
          
          
          <MenuItem
              key={'menu_52s34'}>
                <NavLink to="/" >
                  Root
                </NavLink>
            </MenuItem>

            <MenuItem
            key={'/db/tables'}>
                <NavLink to="/db/tables">
                  Tables
                </NavLink>
            </MenuItem>

            <MenuItem
            key={'/pepa/callstack'}>
                <NavLink to="/pepa/callstack">
                  Pechkin
                </NavLink>
            </MenuItem>

            {/* <MenuItem
            key={'/db/tables/dfd'}>
                <NavLink to="/db/tables/:table_name">
                  Tablenames
                </NavLink>
            </MenuItem> */}


  
        </Menu>

    
      </Header>



    </div>
  );
};

export default AppMenuUt;