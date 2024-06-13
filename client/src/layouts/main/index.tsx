import { ModeToggle } from "@/components/ModeToggle"
import { Outlet } from "react-router-dom"

const index = () => {
  return (
    <main className="w-full h-screen max-w-screen-xl p-5 bg-background">
      <div className="flex gap-3">
        <h5>temporary mode toggle</h5>
        <ModeToggle />
      </div>
        <Outlet />
    </main>
  )
}

export default index