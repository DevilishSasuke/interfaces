import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ManagerRoute = ({ children }) => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) return <div>Загрузка...</div>;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin" && user.role !== "manager") return <div>{user.role}</div>;

  return children;
};

export default ManagerRoute;
