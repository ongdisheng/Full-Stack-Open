import { useEffect, useState } from 'react'
import userService from '../services/users'

const User = ({ user }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
