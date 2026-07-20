import { Navigate } from "react-router-dom";

const Profile = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};

export default Profile;