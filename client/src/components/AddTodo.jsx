import { useState } from 'react'
import { useDispatch } from 'react-redux';
import {createTodo} from '../features/todoSlice';

const AddTodo = () => {

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  const handleSubmit = (e) => {
		e.preventDefault();

		if(name.trim().length === 0)
		{
			alert("Enter a task before adding !!");
      setName('');
      setDescription('');
			return;
		}

    dispatch(createTodo({name, description}))
    setName('');
    setDescription('');

	};

  return (
    <div className="contactez-nous">
    <h1 className="text-center text-2xl">Contactez-nous</h1>
    <p>This form allows you to post a new todo!</p>
    <form onSubmit={handleSubmit}>
    <div>
    <label htmlFor="nom">Name</label>
    <input type="text" 
    id="nom"  
    placeholder="Todo"
    value={name}
    onChange={(e) => setName(e.target.value)}
    />
    </div>
    <div>
    <label htmlFor="nom">Description</label>
    <input type="text" 
    id="nom"  
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
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