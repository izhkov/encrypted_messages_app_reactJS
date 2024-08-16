import { Link } from 'react-router-dom'

function Main() {
  return (
    <>
      <div className="links">
        <Link className="link__item" to="/create">
          Создать note
        </Link>

        <Link className="link__item" to="/note">
          Просмотреть note
        </Link>
      </div>
    </>
  )
}

export default Main
