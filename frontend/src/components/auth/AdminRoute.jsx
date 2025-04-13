import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <div>Недостаточно прав</div>;

  return children;
};

export default AdminRoute;
