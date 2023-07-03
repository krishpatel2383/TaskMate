package com.krish.TaskMate.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.krish.TaskMate.Model.Todo;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
	Todo findByTitleAndUser(String title, String user_email);

	List<Todo> findByUser(String user_email);
}
