import express from "express";
const app = express();

app.use(express.json()); // lets Express read JSON sent in the request body

// Fake "database": just an array in memory
let messages = [
  { id: 1, user:"sophia",text: "hi", timestamp:Date.now() },
];
let nextId = 2;

// GET all todos
app.get("/messages", (req, res) => {
  res.json(messages);
});

// GET one todo
app.get("/messages/:id", (req, res) => {
  const todo = messages.find((todo) => todo.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "Not found" });
  res.json(todo);
});

// POST (create) a todo
app.post("/messages", (req, res) => {
  const todo = { id: nextId++, text: req.body.text, done: false };
  messages.push(todo);
  res.status(201).json(todo);
});

// PUT (update) a todo
app.put("/messages/:id", (req, res) => {
  const todo = messages.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: "Not found" });
  todo.text = req.body.text ?? todo.text;
  todo.done = req.body.done ?? todo.done;
  res.json(todo);
});

// DELETE a todo
app.delete("/messages/:id", (req, res) => {
  messages = messages.filter((t) => t.id !== Number(req.params.id));
  res.status(204).send();
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));