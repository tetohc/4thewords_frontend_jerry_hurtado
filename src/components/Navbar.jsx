import { Link, NavLink } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Navbar = () => {
  return (
    <>
      <nav className="bg-primary p-4 flex flex-col md:flex-row justify-between items-center">
        <Link className="text-white text-xl font-bold mb-4 md:mb-0" to="/">
          Leyendas costarricenses
        </Link>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <NavLink
            className={({ isActive }) => 
              `text-gray-300 hover:text-white text-center ${isActive ? 'active' : ''}`
            }
            to="/"
          >
            Inicio
          </NavLink>

          <NavLink
            className={({ isActive }) => 
              `text-gray-300 text-center hover:text-white ${isActive ? 'active' : ''}`
            }
            to="/search"
          >
            Búsqueda
          </NavLink>
          
        </div>
      <ThemeSwitcher/>

      </nav>
    </>
  );
}
