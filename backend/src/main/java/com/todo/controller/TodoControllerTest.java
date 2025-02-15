package com.todo.controller;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import org.mockito.Mock;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TodoController.class)
class TodoControllerTest {

    @MockBean
    private TodoRepository repository;

    @Test
    void getAllTodos_ShouldReturnList() throws Exception {
        List<Todo> todos = Arrays.asList(new Todo(1L, "Test Task", false));
        Mockito.when(repository.findAll()).thenReturn(todos);
    }
}
