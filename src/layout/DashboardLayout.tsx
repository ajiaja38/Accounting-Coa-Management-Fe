import React, { useState } from "react"
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons"
import { Button, Layout, Menu, Modal, theme, type MenuProps } from "antd"
import { Outlet, useNavigate, type NavigateFunction } from "react-router"
import type { ItemType, MenuItemType } from "antd/es/menu/interface"
import { useRedux } from "../config/hooks/useRedux"
import { EReducer } from "../types/enum/EReducer.enum"
import { logout } from "../config/redux/auth/slices"

const { Header, Sider, Content } = Layout

const menuItems: ItemType<MenuItemType>[] = [
  {
    key: "/home",
    icon: <UserOutlined />,
    label: "Home",
  },
  {
    key: "/journal",
    icon: <VideoCameraOutlined />,
    label: "Journal",
  },
  {
    key: "/testing-coa",
    icon: <UploadOutlined />,
    label: "Testing Coa",
    children: [
      {
        key: "/testing-coa/1",
        label: "Testing Coa 1",
      },
      {
        key: "/testing-coa/2",
        label: "Testing Coa 2",
      },
    ],
  },
]

const DashboardLayout: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()

  const { dispatch } = useRedux(EReducer.AUTH)

  const [collapsed, setCollapsed] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => setIsModalOpen(true)

  const handleOk = () => {
    setIsModalOpen(false)
    dispatch(logout()).then(() => navigate("/"))
  }

  const handleCancel = () => setIsModalOpen(false)

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const onClick: MenuProps["onClick"] = (e) => navigate(e.key)

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            top: 0,
          }}
        >
          <div className='demo-logo-vertical' />
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={["/home"]}
            items={menuItems}
            onClick={onClick}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              position: "sticky",
              top: 0,
              zIndex: 9,
              borderBottom: "1px solid #d9d9d9",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingInlineEnd: 20,
            }}
          >
            <Button
              type='text'
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Button onClick={showModal} type='primary'>
              Logout
            </Button>
          </Header>
          <Content
            style={{
              margin: "16px",
            }}
          >
            <div className='bg-white p-5 rounded-xl border border-gray-200'>
              <Outlet />
            </div>
            <footer className='p-4 text-center'>
              Accounting Management &copy; {new Date().getFullYear()}
            </footer>
          </Content>
        </Layout>
      </Layout>
      <Modal
        title='Logout'
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  )
}

export default DashboardLayout
