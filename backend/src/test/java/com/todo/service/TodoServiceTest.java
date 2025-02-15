package com.todo.service;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TodoServiceTest {
    TodoRepository todoRepository = mock(TodoRepository.class);
    TodoService todoService = new TodoService(todoRepository);

    @Test
    void shouldReturnTodos() {
        when(todoRepository.findAll()).thenReturn(List.of(new Todo(1L, "Test Task", false)));
        List<Todo> todos = todoService.getTodos();
        assertEquals(1, todos.size());
    }

    @Test
    void shouldAddTodo() {
        Todo todo = new Todo(null, "New Task", false);
        when(todoRepository.save(todo)).thenReturn(new Todo(1L, "New Task", false));

        Todo savedTodo = todoService.addTodo(todo);
        assertNotNull(savedTodo.getId());
    }
}
