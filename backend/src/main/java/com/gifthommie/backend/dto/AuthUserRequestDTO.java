package com.gifthommie.backend.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class AuthUserRequestDTO implements Serializable {
	private String username;
	private String password;
	
	public AuthUserRequestDTO() {
	}
	public AuthUserRequestDTO(String username, String password) {
		this.username = username;
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
}
