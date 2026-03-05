import type { ItemType, MenuItemType } from "antd/es/menu/interface"
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons"

const menuItems: ItemType<MenuItemType>[] = [
  {
    type: "group",
    label: "Dashboard",
    children: [
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
            key: "/testing-1",
            label: "Testing Coa 1",
          },
          {
            key: "/testing-coa/2",
            label: "Testing Coa 2",
          },
        ],
      },
    ],
  },
]

export default menuItems
