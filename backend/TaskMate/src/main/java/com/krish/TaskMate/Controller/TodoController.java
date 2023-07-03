package com.krish.TaskMate.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krish.TaskMate.Model.Todo;
import com.krish.TaskMate.Model.User;
import com.krish.TaskMate.Service.TodoService;

@RestController
@RequestMapping("/api/todo")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

	@Autowired
	public TodoService todoService;

	@PostMapping("/home")
	public List<Todo> listAllTodos(@RequestBody User user) {
		List<Todo> todos = todoService.getTodosByEmail(user.getEmail());
		return todos;
	}

	@PostMapping("/details")
	public ResponseEntity<Todo> getTodoDetails(@RequestBody Todo todo) {
		Long todoId = todo.getId();
		Todo fetchedTodo = todoService.getTodoById(todoId);
		if (fetchedTodo != null) {
			return ResponseEntity.ok(fetchedTodo);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/create")
	public ResponseEntity<String> createTodo(@RequestBody Todo todo) {
		todoService.createTodo(todo);
		return ResponseEntity.ok("todo created successfully.");
	}

	@PutMapping("/update")
	public ResponseEntity<String> updateTodo(@RequestBody Todo todo) {
//		String userEmail = todo.getUser();
		todoService.updateTodo(todo);
		return ResponseEntity.ok("todo updated suceessfully.");
	}

	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteTodo(@RequestBody Todo todo) {
		todoService.deleteTodo(todo.getId());
		return ResponseEntity.ok("todo deleted successfully.");
	}
}
