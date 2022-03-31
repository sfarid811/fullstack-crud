import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {createTodo} from '../features/todoSlice';

const AddTodo = () => {

  const dispatch = useDispatch();

  const [todo, setTodo] = useState({
    name: "",
    isComplete: false,
  });

  const handleSubmit = (e) => {

  
    e.preventDefault();

    if(todo.name === "" || todo.name.length < 5) {
      alert("Please fill the field")
    } else {
      const newTodo = {
        ...todo,
        date: new Date(),
      };
  
        dispatch(createTodo(newTodo));
      
     
    }
    setTodo({
      task: "",
      isComplete: false,
    });
  };


  return (
    <div className="contactez-nous">
    <h1>Contactez-nous</h1>
    <p>This form allows you to post a new todo!</p>
    <form onSubmit={handleSubmit}>
    <div>
    <label htmlFor="nom">Votre nom</label>
    <input type="text" 
    id="nom"  
    placeholder="Todo"
    value={todo.name}
    onChange={(e) => setTodo({ ...todo, name: e.target.value })}
    />
    </div>
   
    <div>
    <button type="submit">Submit</button>
    </div>
    </form>
    </div>
  )
}

export default AddTodo