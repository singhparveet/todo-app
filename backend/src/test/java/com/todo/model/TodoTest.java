package com.todo.model;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class TodoTest {

    @Test
    void testTodoGettersAndSetters() {
        // Arrange
        Todo todo = new Todo();
        
        // Act
        todo.setId(1L);
        todo.setTitle("Test Task");
        todo.setCompleted(true);

        // Assert
        assertThat(todo.getId()).isEqualTo(1L);
        assertThat(todo.getTitle()).isEqualTo("Test Task");
        assertThat(todo.isCompleted()).isTrue();
    }

    @Test
    void testTodoParameterizedConstructor() {
        // Act
        Todo todo = new Todo(2L, "Parameterized Task", false);

        // Assert
        assertThat(todo.getId()).isEqualTo(2L);
        assertThat(todo.getTitle()).isEqualTo("Parameterized Task");
        assertThat(todo.isCompleted()).isFalse();
    }

    @Test
    void testTodoToString() {
        // Arrange
        Todo todo = new Todo(3L, "String Test Task", true);

        // Act
        String result = todo.toString();

        // Assert
        assertThat(result).isEqualTo("Todo{id=3, title='String Test Task', completed=true}");
    }

    @Test
    void testTodoEquality() {
        // Arrange
        Todo todo1 = new Todo(4L, "Equality Test", false);
        Todo todo2 = new Todo(4L, "Equality Test", false);

        // Assert
        assertThat(todo1).usingRecursiveComparison().isEqualTo(todo2);
    }
}
