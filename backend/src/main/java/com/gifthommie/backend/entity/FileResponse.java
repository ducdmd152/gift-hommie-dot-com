package com.gifthommie.backend.entity;

public class FileResponse {
	String fileName;
	String message;
	String pathFile;
	
	

	public FileResponse(String fileName, String message, String pathFile) {
		this.fileName = fileName;
		this.message = message;
		this.pathFile = pathFile;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getPathFile() {
		return pathFile;
	}

	public void setPathFile(String pathFile) {
		this.pathFile = pathFile;
	}

	
	
	
	
}
