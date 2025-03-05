import { Link } from "react-router-dom";
import "../styles/Menu.css"; 

const Menu = () => {
  return (
    <aside className="menu-lateral">
      <img src="/assets/epn-logo.jpg" alt="Logo" className="logo" />
      <nav>
        <ul>
          <li className="opciones"><Link to="/materias">Materias</Link></li>
          <li className="opciones"><Link to="/estudiantes">Estudiantes</Link></li>
          <li className="opciones"><Link to="/matriculas">Matrículas</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Menu;
