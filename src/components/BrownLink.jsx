import { Link } from "react-router-dom";

export function BrownLink({ to, title, children }) {
  return (
    <Link 
      to={to}
      title={title}
      className="text-amber-800 underline hover:text-amber-950"
    >
      {children}
    </Link>
  );
}
