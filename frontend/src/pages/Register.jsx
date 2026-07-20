import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <h1>Register Page</h1>

      <p className="text-center mt-5">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;