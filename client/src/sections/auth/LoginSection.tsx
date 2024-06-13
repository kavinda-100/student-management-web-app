import { ZodRoleType } from "@/zod"


type LoginSectionProps = {
    role: ZodRoleType
}

const LoginSection = (role: LoginSectionProps) => {
  return (
    <div>LoginSection</div>
  )
}

export default LoginSection