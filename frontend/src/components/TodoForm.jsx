import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

export default function TodoForm({ onTodoAdded }) {
    const [title, setTitle] = useState("");

    const addTodo = () => {
        if (!title.trim()) return;

        axios.post("http://localhost:8080/api/todos", { title, completed: false })
            .then((res) => {
                onTodoAdded(res.data);
                setTitle("");
            });
    };

    return (
        <div>
            <TextField
                label="New Todo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={addTodo}>
                Add
            </Button>
        </div>
    );
}
