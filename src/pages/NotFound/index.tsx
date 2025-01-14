import { Link, useNavigate } from "react-router-dom";
import "./index.scss";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notFound_container">
      <h1 className="notFound_text">Página não encontrada D:</h1>
      <Link className="notFound_link" to="/">
        Ir para página inicial
      </Link>
    </div>
  );
};
