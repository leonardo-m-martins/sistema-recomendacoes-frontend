import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./LogoutIcon.css";

function LogoutIcon() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <div
      onClick={handleLogout}
      title="Sair"
    >
      <MdLogout className="logout-icon" />
    </div>
  );
}

export default LogoutIcon;
