package com.gifthommie.backend.dto;

import java.io.Serializable;

public class FileResponseDTO implements Serializable {
	private String url;

	
	public FileResponseDTO(String url) {
		this.url = url;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
}
