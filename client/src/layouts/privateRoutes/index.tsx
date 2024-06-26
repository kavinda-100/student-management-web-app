// Desc: Private routes layout
import { Outlet, Navigate } from "react-router-dom";
//Redux
import { useAppSelector } from "@/store/reduxHooks"
import { selectUser } from "@/store/features/userSlice"

const Index = () => {
  const user = useAppSelector(selectUser);

  return (user !== null ? <Outlet /> : <Navigate to="/" />);
};

export default Index;
