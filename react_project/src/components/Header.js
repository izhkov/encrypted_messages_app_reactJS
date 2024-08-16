import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink className="nav__item" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__item" to="/create">
              Create
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__item" to="/note">
              Note
            </NavLink>
          </li>
          <li>
            <NavLink className="nav__item" to="/about">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
