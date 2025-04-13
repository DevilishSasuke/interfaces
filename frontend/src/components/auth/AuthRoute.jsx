import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthRoute = ({ children }) => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) return <div>Загрузка...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default AuthRoute;
