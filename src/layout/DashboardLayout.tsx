import React, { useRef, useState, type JSX } from "react"
import {
  FundProjectionScreenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons"
import { Button, Layout, Menu, Modal, theme, type MenuProps } from "antd"
import { Outlet, useNavigate, type NavigateFunction } from "react-router"
import { useRedux } from "../config/hooks/useRedux"
import { EReducer } from "../types/enum/EReducer.enum"
import { logout } from "../config/redux/auth/slices"
import menuItems from "./MenuItem"

const { Header, Sider, Content } = Layout

const DashboardLayout: React.FC = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate()
  const refHeading: React.RefObject<HTMLHeadingElement | null> =
    useRef<HTMLHeadingElement>(null)
  const refLogo: React.RefObject<HTMLSpanElement | null> =
    useRef<HTMLSpanElement>(null)

  const { dispatch } = useRedux(EReducer.AUTH)

  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleCollapse = (): void => {
    setCollapsed(!collapsed)

    if (refHeading.current && refLogo.current) {
      refHeading.current.style.display = collapsed ? "block" : "none"
      refLogo.current.style.fontSize = collapsed ? "24px" : "16px"
    }
  }

  const showModal: () => void = (): void => setIsModalOpen(true)

  const handleOk: () => void = (): void => {
    setIsModalOpen(false)
    dispatch(logout()).then((): void | Promise<void> => navigate("/"))
  }

  const handleCancel: () => void = (): void => setIsModalOpen(false)

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const onClick: MenuProps["onClick"] = (e): void | Promise<void> =>
    navigate(e.key)

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
          collapsedWidth={50}
          style={{
            position: "sticky",
            top: 0,
            padding: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div className='my-3 flex flex-col items-center justify-center gap-y-1'>
            <FundProjectionScreenOutlined
              ref={refLogo}
              style={{
                color: "white",
                fontSize: "24px",
              }}
            />
            <h1 className='text-white text-center font-bold' ref={refHeading}>
              Finance Genius
            </h1>
          </div>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={["/home"]}
            items={menuItems}
            onClick={onClick}
            style={{
              borderRight: 0,
              overflowY: "auto",
              height: "100vh",
            }}
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
              onClick={handleCollapse}
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
