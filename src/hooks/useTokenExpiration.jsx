import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const useTokenExpiration = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const jwt = localStorage.getItem("token");
      if (!jwt) return false;

      try {
        const decodedToken = jwtDecode(jwt);
        const currentTime = Date.now() / 1000; // Tiempo actual en segundos

        // Tiempo de expiración ajustado a 10 minutos (600 segundos)
        const expirationTime = decodedToken.exp || 0;
        const adjustedExpirationTime = expirationTime - 600;

        if (currentTime > adjustedExpirationTime) {
          localStorage.removeItem("token"); // Elimina el token vencido
          Swal.fire({
            icon: "warning",
            title: "Sesión expirada",
            text: "Tu sesión ha expirado, por favor vuelve a iniciar sesión.",
            confirmButtonText: "Aceptar",
          }).then(() => {
            navigate("/login");
          });
          return true;
        }
      } catch (error) {
        // Maneja el caso donde el token no es válido o no se puede decodificar
        console.error("Token no válido", error);
        localStorage.removeItem("token");
        navigate("/login");
        return true;
      }
      return false;
    };

    if (checkTokenExpiration()) return;
  }, [navigate]);
};

export default useTokenExpiration;
