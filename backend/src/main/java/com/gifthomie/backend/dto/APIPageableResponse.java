package com.gifthomie.backend.dto;

import java.util.List;

import org.springframework.data.domain.Page;

public class APIPageableResponse<T> {
	public List<T> content;
	public APIPageableDTO pageable;
	
	public APIPageableResponse() {
	}
	
	public APIPageableResponse(Page<T> page) {
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
