import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ onLogin, failedLogin }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      onLogin(user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      failedLogin()
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
                        username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
                        password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )


}

export default LoginForm
