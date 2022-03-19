import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

function Todo({ todo, index, removeTodo }) {
  const [done, setDone] = useState(false);
  return (
    <Card
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "1em",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        style={{
          display: "flex",
          textDecoration: done ? "line-through" : "",
          marginLeft: "1em",
        }}
      >
        {todo.text}
      </Typography>
      <div>
        <IconButton aria-label="delete">
          <CheckIcon onClick={() => setDone(!done)}>✓</CheckIcon>{" "}
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon onClick={() => removeTodo(index)} />
        </IconButton>
      </div>
    </Card>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30vw",
      }}
    >
      <div>
        <TextField
          id="filled-basic"
          variant="filled"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add New Todo"
          style={{
            width: "100%",
          }}
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        style={{
          marginTop: "2em",
        }}
      >
        Submit
      </Button>
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/todos.json")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        console.log(todos);
      });
  }, []);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5em",
        minWidth: "300px",
      }}
    >
      <div
        style={{
          width: "30vw",
        }}
      >
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <>
              <Todo
                key={index}
                index={index}
                todo={todo}
                removeTodo={removeTodo}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
