import { useDispatch } from 'react-redux'

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
      dispatch({type: 'filter/changeFilter', payload: event.target.value})
    }
    
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        <h2>filter</h2>
        <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter