import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
    <div>
        <h2>login</h2>
        <form onSubmit={handleLogin}>
          username<input type="text" name="username" onChange={({target}) => setUsername(target.value)} value={username}/><br/>
          password<input type="password" onChange={({target}) => setPassword(target.value)} value={password}/><br/>
          <button type="submit">login</button>
        </form>
    </div>
    )
  }

  const blogForm = () => {
    return (
    <div>
      logged in as user {user.username}
      <form onSubmit={() => window.localStorage.clear()}>
        <button type='submit'>log out</button>
      </form>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        title: <input type="text" value={title} onChange={({target}) => setTitle(target.value)}/>
        author: <input type="text" value={author} onChange={({target}) => setAuthor(target.value)}/>
        url: <input type="text" value={url} onChange={({target}) => setUrl(target.value)}/>
        <button type='submit'>create</button>
      </form>
    </div>
    )
  }

  const handleLogin= async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      console.log(user)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage("login succeeded")
      setMessageType("notification")
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      console.log(exception)
      setMessage("wrong username or password")
      setMessageType("error")
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      blogService.create({title: title, author: author, url: url})
      setMessage(`new blog ${title} added`)
      setMessageType("notification")
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      console.log(exception)
      setMessage("blog post failed")
      setMessageType("error")
      console.log(exception)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <Notification message={errorMessage} type={messageType}/>
      <h1>Blogs</h1>
      {!user && loginForm()}
      {user && blogForm()}
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
  )
  
}

export default App