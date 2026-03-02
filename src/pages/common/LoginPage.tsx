import { Button, Form, Input, type FormProps } from "antd"
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
    Auth: { loading, user },
  } = useRedux(EReducer.AUTH)

  const navigate = useNavigate()

  const onFinish: FormProps<ILoginPayload>["onFinish"] = async (
    values: ILoginPayload,
  ) => {
    dispatch(login(values)).then((e: any) => {
      if (!e.error) navigate("/home")
    })
  }

  const onFinishFailed: FormProps<ILoginPayload>["onFinishFailed"] = (
    errorInfo,
  ) => {
    alert(`Failed: ${errorInfo}`)
  }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-gray-100 px-9'>
      <div className='bg-white py-7 px-7 rounded-2xl shadow-2xl w-full lg:w-2/6'>
        <h1 className='font-bold text-center text-xl mb-6'>Silahkan Masuk</h1>
        <Form
          name='basic'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
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

          <Form.Item<ILoginPayload>
            name='password'
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder='Input Your Password'
              style={{ marginTop: 12, padding: 10 }}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button type='primary' htmlType='submit' style={{ marginTop: 12 }}>
              {loading ? "Loading..." : "Masuk"} {user.userName}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginPage
