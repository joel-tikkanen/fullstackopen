import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
   
    const vote = (id, content) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        console.log("lol")
        dispatch(setNotification(`you just voted anecdote ${content}`, 5))
    }

    const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())))
    console.log(anecdotes)
    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotes.slice().sort((a,b) => {return b.votes-a.votes}).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
        
        )}
      </div>
    )
}
    
export default AnecdoteList