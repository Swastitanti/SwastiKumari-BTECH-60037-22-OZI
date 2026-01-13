import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // remove JWT token
    localStorage.removeItem("token");

    // redirect to login page
    navigate("/");
  }, [navigate]);

  return null;
}
