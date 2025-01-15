import axios from "axios";
import { Link } from "react-router-dom";
import "./index.scss";

interface IErrorProps {
  error: Error | null;
}

export function ErrorComponent({ error }: IErrorProps) {
  const errorMessage = () => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            return "Recurso não encontrado";
          case 401:
          case 403:
            return "Não autorizado. Certifique-se que seu API_TOKEN está correto!";
          case 500:
            return "Erro interno do servidor. Tente novamente mais tarde";
          default:
            return `Erro desconhecido: {error.response.status}.`;
        }
      } else if (error.request) {
        return "Erro de rede. Por favor, tente novamente.";
      } else {
        return `Erro: {error.message}`;
      }
    } else {
      return "Página não encontrada";
    }
  };

  return (
    <div className="error_container">
      <h1 className="error_text">{errorMessage()}</h1>
      <Link className="error_link" to="/">
        Ir para página inicial
      </Link>
    </div>
  );
}
