
import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const filterText = event.target.value
    dispatch(setFilter(filterText))
    
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default VisibilityFilter