const Todo = require('../models/todo');
const Joi = require('joi');

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ date: -1 });
        res.send(todos);
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Error: " + error.message);
      }
}
const createTodo = async (req, res) => {
    try {
        const schema = Joi.object({
          name: Joi.string().min(3).max(300).required(),
          description: Joi.string().min(20).max(300).required(),
        });
    
        const { error } = schema.validate(req.body);
    
        if (error) return res.status(400).send(error.details[0].message);
    
        const { name, description } = req.body;
    
        let todo = new Todo({ name, description });
    
        todo = await todo.save();
        res.send(todo);
      } catch (error) {
       
        res.status(500).send(error.message);
      }
}


const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  if (!todo) {
    res.status(400)
    throw new Error('Todo not found')
  }

  await todo.remove()

  res.status(200).json({ id: req.params.id })
};

const updateTodo = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(300).required(),
    description: Joi.string().min(20).max(300).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).send("Todo not found...");

  const { name, description} = req.body;

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true }
  );

  res.send(updatedTodo);

}

module.exports = {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo
}