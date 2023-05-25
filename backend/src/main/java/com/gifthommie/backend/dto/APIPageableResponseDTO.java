package com.gifthommie.backend.dto;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.domain.Page;

public class APIPageableResponseDTO<T> implements Serializable {
	public List<T> content;
	public APIPageableDTO pageable;
	
	public APIPageableResponseDTO() {
	}
	
	public APIPageableResponseDTO(Page<T> page) {
		setContent(page.getContent());
		setPageable(new APIPageableDTO(page));
	}
	
	public List<T> getContent() {
		return content;
	}
	public void setContent(List<T> content) {
		this.content = content;
	}
	public APIPageableDTO getPageable() {
		return pageable;
	}
	public void setPageable(APIPageableDTO pageable) {
		this.pageable = pageable;
	}
	
	
	
}
