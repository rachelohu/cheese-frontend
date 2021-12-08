import {useState} from "react"

function Show(props){
  // grab the id param from match
  const id = props.match.params.id
  // save cheese standalone variable
  const cheese = props.cheese
  // find the cheese to show
  const cheddar = cheese.find((singleCheddar) => {
    return singleCheddar._id === id
  })

// state for our form
const [editForm, setEditForm] = useState(cheddar)

// handleChange fx for form
const handleChange = (event) => {
  setEditForm({ ...editForm, [event.target.name]: event.target.value });
};

// handlesubmit fx for form submission
const handleSubmit = event => {
  event.preventDefault()
  props.updateCheese(editForm, cheddar._id)
  // redirect cheese back to index
  props.history.push("/")
}

const removeCheddar = () => {
  props.deleteCheese(cheddar._id)
  props.history.push("/")

}

return (
  <div className="cheese">
    <h1>{cheddar.name}</h1>
    <h2>{cheddar.title}</h2>
    <img src={cheddar.image} alt={cheddar.name} />
    <button onClick={removeCheddar} id="delete">
        DELETE
      </button>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={editForm.name}
        name="name"
        placeholder="name"
        onChange={handleChange}
      />
      <input
        type="text"
        value={editForm.image}
        name="image"
        placeholder="image URL"
        onChange={handleChange}
      />
      <input
        type="text"
        value={editForm.countryOfOrigin}
        name="countryOfOrigin"
        placeholder="countryOfOrigin"
        onChange={handleChange}
      />
      <input type="submit" value="Update Cheddar" />
    </form>
  </div>
)
}

export default Show