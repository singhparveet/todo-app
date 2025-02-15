import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, List, ListItem, ListItemText } from "@mui/material";

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/api/todos").then((res) => setTodos(res.data));
    }, []);

    const addTodo = () => {
        axios.post("http://localhost:8080/api/todos", { title: newTodo, completed: false })
            .then(res => setTodos([...todos, res.data]));
        setNewTodo("");
    };

    return (
        <div>
            <TextField label="New Todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            <Button onClick={addTodo}>Add</Button>
            <List>
                {todos.map(todo => (
                    <ListItem key={todo.id}>
                        <ListItemText primary={todo.title} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
