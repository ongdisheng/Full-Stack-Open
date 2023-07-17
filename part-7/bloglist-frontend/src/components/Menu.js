import { Link } from 'react-router-dom'

const Menu = ({ user, handleLogout }) => {
  const menuStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
    backgroundColor: 'silver',
  }

  return (
    <div style={menuStyle}>
      <Link to={'/'}>blogs </Link>
      <Link to={'/users'}>users </Link>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Menu
