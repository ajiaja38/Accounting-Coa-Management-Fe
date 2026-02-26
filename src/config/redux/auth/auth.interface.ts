import type { ERole } from "../../../types/enum/ERole.enum"

export interface ILoginPayload {
  email: string
  password: string
}

export interface IResponseLogin {
  userId: string
  userName: string
  email: string
  role: ERole
}
