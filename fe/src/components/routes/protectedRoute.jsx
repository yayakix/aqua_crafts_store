import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/usercontex";

const ProtectedRoute = ({ children, redirectPath = "/" }) => {
  const { currUser } = useContext(UserContext);
  console.log("currUser", currUser);

  if (currUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
