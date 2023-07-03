package com.krish.TaskMate.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "users")
public class User {

	public User(long id,
			@NotBlank(message = "Email is required.") @Email(message = "Email must be valid.") String email,
			@NotBlank @Size(min = 6, message = "password must be atleast 6 characters.") String password,
			String resetToken) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.resetToken = resetToken;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotBlank(message = "Email is required.")
	@Email(message = "Email must be valid.")
	@Column(nullable = false, unique = true)
	private String email;

	@NotBlank
	@Size(min = 6, message = "password must be atleast 6 characters.")
	@Column(nullable = false)
	private String password;

	@Column(name = "reset_token")
	private String resetToken;

	public String getPassword() {
		return password;
	}

	public String getResetToken() {
		return resetToken;
	}

	public void setResetToken(String resetToken) {
		this.resetToken = resetToken;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public User() {

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

}
