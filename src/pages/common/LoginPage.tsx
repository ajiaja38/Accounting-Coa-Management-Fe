import {
  App,
  Button,
  Form,
  Input,
  Spin,
  Typography,
  type FormProps,
} from "antd"
import type { JSX } from "react"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { useRedux } from "../../config/hooks/useRedux"
import { EReducer } from "../../types/enum/EReducer.enum"
import { login } from "../../config/redux/auth/slices"
import type { ILoginPayload } from "../../config/redux/auth/auth.interface"
import { useNavigate } from "react-router"

const LoginPage = (): JSX.Element => {
  const {
    dispatch,
    Auth: { loading },
  } = useRedux(EReducer.AUTH)

  const navigate = useNavigate()

  const { notification } = App.useApp()

  const onFinish: FormProps<ILoginPayload>["onFinish"] = async (
    values: ILoginPayload,
  ) => {
    dispatch(login(values)).then((e: any) => {
      if (!e.error) navigate("/home")
      else
        notification.error({
          title: "Error",
          description: e.payload,
          pauseOnHover: true,
        })
    })
  }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-linear-to-r from-cyan-500 to-blue-500'>
      <div className='w-full h-screen hidden lg:flex justify-center items-center'>
        <Typography.Title
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "4rem",
            textAlign: "center",
          }}
        >
          "Financial Accounting Management".
        </Typography.Title>
      </div>
      <div className='w-full h-screen flex justify-center items-center p-9'>
        <div className='bg-white py-7 px-7 shadow-2xl w-full lg:w-10/12 rounded'>
          <h1 className='font-bold text-center text-xl mb-6'>
            Silahkan Masuk Der
          </h1>
          <Form name='basic' onFinish={onFinish} autoComplete='off'>
            <Typography.Text type='secondary'>Email</Typography.Text>
            <Form.Item<ILoginPayload>
              name='email'
              rules={[
                { required: true, message: "Tolong masukkan email anda" },
                { type: "email", message: "Email tidak valid!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder='Masukkan email anda'
                type='email'
                style={{ marginTop: 12, padding: 10 }}
              />
            </Form.Item>

            <Typography.Text type='secondary'>Password</Typography.Text>
            <Form.Item<ILoginPayload>
              name='password'
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder='Input Your Password'
                style={{ marginTop: 12, padding: 10 }}
              />
            </Form.Item>

            <Form.Item label={null}>
              <Button
                type='primary'
                htmlType='submit'
                size='large'
                style={{ width: "100%", marginTop: "1rem" }}
              >
                {loading ? <Spin style={{ color: "white" }} /> : "Masuk"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
