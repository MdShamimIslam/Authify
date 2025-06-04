import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axiosInc";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [shops, setShops] = useState([]);

  const host = window.location.hostname;
  const isLocalhost = host === "localhost" || host.endsWith(".localhost");

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out from your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.post("/users/logout");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        toast.success("Logout successful!");
      } catch (error) {
        console.error(error);
        toast.error("Logout failed. Try again.");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axiosInstance
      .get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setShops(res?.data?.user?.shopNames);
      });
  }, []);

  const handleClick = (shop) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (isLocalhost) {
      const url = `http://${shop}.localhost:5173?token=${token}&user=${encodeURIComponent(user)}`;
      window.location.href = url;
    } else {
      navigate(`/shop/${shop}?token=${token}&user=${encodeURIComponent(user)}`);
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Welcome, {user?.username}</h2>

      <div className="relative right-16 mt-4">
        <button
          className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full cursor-pointer"
          onClick={() => setShowProfile((prev) => !prev)}
        >
          👤
        </button>

        {showProfile && (
          <div className="absolute right-[-36px] mt-16 bg-white shadow-lg p-4 rounded border">
            <h3 className="font-semibold">Your Shops:</h3>
            <ol className="list-disc ml-5">
              {shops?.map((shop, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => handleClick(shop)}
                >
                  {shop}
                </li>
              ))}
            </ol>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
