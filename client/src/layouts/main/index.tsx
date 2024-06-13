import { Outlet } from "react-router-dom"

const index = () => {
  return (
    <main className="w-full h-screen max-w-screen-xl bg-background">
        <Outlet />
    </main>
  )
}

export default index