import { useState } from "react";
import "../styles/Login.css"; 

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "usuario@ejemplo.com" && clave === "123456") {
      onLogin(); // Si la validación es exitosa, cambiar el estado en App.jsx
    } else {
      alert("Email o clave incorrectos.");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Clave:</label>
          <input
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Login;
