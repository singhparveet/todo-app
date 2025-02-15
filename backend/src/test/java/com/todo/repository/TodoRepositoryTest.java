package com.todo.repository;

import com.todo.model.Todo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest // Provides an in-memory database for testing
class TodoRepositoryTest {

    @Autowired
    private TodoRepository todoRepository;

    @Test
    void shouldSaveTodo() {
        // Arrange
        Todo todo = new Todo();
        todo.setTitle("Test Task");
        todo.setCompleted(false);

        // Act
        Todo savedTodo = todoRepository.save(todo);

        // Assert
        assertThat(savedTodo).isNotNull();
        assertThat(savedTodo.getId()).isNotNull();
        assertThat(savedTodo.getTitle()).isEqualTo("Test Task");
    }

    @Test
    void shouldFindTodoById() {
        // Arrange
        Todo todo = new Todo();
        todo.setTitle("Find Me");
        todo.setCompleted(true);
        Todo savedTodo = todoRepository.save(todo);

        // Act
        Optional<Todo> foundTodo = todoRepository.findById(savedTodo.getId());

        // Assert
        assertThat(foundTodo).isPresent();
        assertThat(foundTodo.get().getTitle()).isEqualTo("Find Me");
    }

    @Test
    void shouldFindAllTodos() {
        // Arrange
        Todo todo1 = new Todo();
        todo1.setTitle("Task 1");
        todo1.setCompleted(false);

        Todo todo2 = new Todo();
        todo2.setTitle("Task 2");
        todo2.setCompleted(true);

        todoRepository.save(todo1);
        todoRepository.save(todo2);

        // Act
        List<Todo> todos = todoRepository.findAll();

        // Assert
        assertThat(todos).hasSize(2);
    }

    @Test
    void shouldDeleteTodo() {
        // Arrange
        Todo todo = new Todo();
        todo.setTitle("To be deleted");
        todo.setCompleted(false);
        Todo savedTodo = todoRepository.save(todo);

        // Act
        todoRepository.delete(savedTodo);
        Optional<Todo> deletedTodo = todoRepository.findById(savedTodo.getId());

        // Assert
        assertThat(deletedTodo).isEmpty();
    }
}
