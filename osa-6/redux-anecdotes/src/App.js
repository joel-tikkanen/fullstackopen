import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { setAnecdotes} from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  }, [dispatch]) 

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm  />
    </div>
  )
}

export default App