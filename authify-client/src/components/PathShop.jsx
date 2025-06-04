import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { axiosInstance } from "../utils/axiosInc";

const PathShop = () => {
  const { shopName } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromQuery = params.get("token");
    const userFromQuery = params.get("user");

    if (tokenFromQuery && userFromQuery) {
      localStorage.setItem("token", tokenFromQuery);
      localStorage.setItem("user", userFromQuery);

      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axiosInstance
      .get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setLoading(false))
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      });
  }, [navigate]);

  if (loading) return <Loading />;

  return <h2 className="text-2xl mt-24 font-bold text-center">This is {shopName} shop</h2>;
};

export default PathShop;
