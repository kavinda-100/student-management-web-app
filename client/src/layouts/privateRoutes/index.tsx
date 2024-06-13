// Desc: Private routes layout
import { Outlet, Navigate } from "react-router-dom";
//Redux
import { useAppSelector } from "@/store/reduxHooks"
import { selectUser } from "@/store/features/userSlice"

const index = () => {
  const user = useAppSelector(selectUser);

  return (user ? <Outlet /> : <Navigate to="/" />);
};

export default index;
