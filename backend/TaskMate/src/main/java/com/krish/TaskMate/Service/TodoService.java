package com.krish.TaskMate.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.krish.TaskMate.Exceptions.DuplicateTodoException;
import com.krish.TaskMate.Exceptions.InvalidTodoException;
import com.krish.TaskMate.Exceptions.TodoNotFoundException;
import com.krish.TaskMate.Model.Todo;
import com.krish.TaskMate.Repository.TodoRepository;

@Service
public class TodoService {

	private final TodoRepository todoRepository;

	public TodoService(TodoRepository todoRepository) {
		this.todoRepository = todoRepository;
	}

	public Todo getTodoById(Long id) {
		Optional<Todo> todoOptional = todoRepository.findById(id);

		if (todoOptional.isPresent()) {
			return todoOptional.get();
		} else {
			throw new TodoNotFoundException("Todo not found.");
		}
	}

	public List<Todo> getTodosByEmail(String email) {

		return todoRepository.findByUser(email);
	}

	public Todo createTodo(Todo todo) {
		String title = todo.getTitle();
		LocalDate dueDate = todo.getDueDate();
		int priority = todo.getPriority();
		String user_email = todo.getUser();

		Todo existingTodo = todoRepository.findByTitleAndUser(title, user_email);
		if (existingTodo != null) {
			throw new DuplicateTodoException("A todo with the same title already exists.");
		}

		LocalDate currentDate = LocalDate.now();
		if (dueDate.isBefore(currentDate)) {
			throw new InvalidTodoException("The due date cannot be in the past.");
		}

		if (!isValidPriority(priority)) {
			throw new InvalidTodoException("Invalid priority value. Allowed values: low, medium, high.");
		}

		todo.setCreatedOn(new Timestamp(System.currentTimeMillis()));
		todo.setUser(user_email);
		return todoRepository.save(todo);
	}

	private boolean isValidPriority(int priority) {
		List<Integer> validPriorities = Arrays.asList(1, 2, 3);
		return validPriorities.contains(priority);
	}

	public Todo updateTodo(Todo updatedTodo) {
		Optional<Todo> getTodo = todoRepository.findById(updatedTodo.getId());
		if (getTodo.isEmpty()) {
			throw new TodoNotFoundException("Todo not found");
		}
		Todo existingTodo = getTodo.get();
		existingTodo.setTitle(updatedTodo.getTitle());
		existingTodo.setDescription(updatedTodo.getDescription());
		LocalDate currentDate = LocalDate.now();
		if (updatedTodo.getDueDate().isBefore(currentDate)) {
			throw new InvalidTodoException("The due date cannot be in the past.");
		}
		existingTodo.setDueDate(updatedTodo.getDueDate());
		if (!isValidPriority(updatedTodo.getPriority())) {
			throw new InvalidTodoException("Invalid priority value. Allowed values: low, medium, high.");
		}
		existingTodo.setPriority(updatedTodo.getPriority());
		existingTodo.setCompleted(updatedTodo.isCompleted());
		return todoRepository.save(existingTodo);
	}

	public void deleteTodo(Long todoId) {
		Optional<Todo> existingTodo = todoRepository.findById(todoId);

		if (existingTodo.isPresent()) {
			todoRepository.deleteById(todoId);
		} else {
			throw new TodoNotFoundException("Todo not found.");
		}

	}
}
