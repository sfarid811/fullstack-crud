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
          isComplete: Joi.boolean(),
          date: Joi.date(),
        });
    
        const { error } = schema.validate(req.body);
    
        if (error) return res.status(400).send(error.details[0].message);
    
        const { name, author, isComplete, date, uid } = req.body;
    
        let todo = new Todo({ name, author, isComplete, date, uid });
    
        todo = await todo.save();
        res.send(todo);
      } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
      }
}

const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);

    if(todo) {
      await todo.remove();
      res.status(200).json({message : 'Todo deleted successfully!'})
    } else {
      res.status(404).json({
        error: "Todo not found !"
    })
    }

}

const updateTodo = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(300).required(),
    isComplete: Joi.boolean(),
    date: Joi.date(),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const todo = await Todo.findById(req.params.id);

  if (!todo) return res.status(404).send("Todo not found...");

  const { name, author, isComplete, date, uid } = req.body;

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    { name, author, isComplete, date, uid },
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