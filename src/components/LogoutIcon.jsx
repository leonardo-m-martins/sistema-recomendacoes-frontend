import { useNavigate } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

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
      className="flex text-amber-500 hover:text-amber-600 cursor-pointer mr-4"
    >
      <TbLogout2 size={40} />
    </div>
  );
}

export default LogoutIcon;
