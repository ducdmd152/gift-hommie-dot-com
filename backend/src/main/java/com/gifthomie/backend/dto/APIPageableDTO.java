package com.gifthomie.backend.dto;

import java.io.Serializable;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class APIPageableDTO implements Serializable {
	
	int pageNumber;
	int pageSize;
	int offset;
	int numberOfElements;
	long totalElements;
	int totalPages;
	boolean sorted;
	boolean first;
	boolean last;
	boolean empty;
	
	public APIPageableDTO() {
	}
	
	public <T> APIPageableDTO(Page<T> page) {
		Pageable pageable = page.getPageable();
		setPageNumber(pageable.getPageNumber());
		setPageSize(pageable.getPageSize());
		setTotalElements(page.getTotalElements());
		setTotalPages(page.getTotalPages());
		setNumberOfElements(page.getNumberOfElements());
		setSorted(page.getSort().isSorted());
		setFirst(page.isFirst());
		setLast(page.isLast());
		setEmpty(page.isEmpty());
	}
	
	public int getPageNumber() {
		return pageNumber;
	}
	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int size) {
		this.pageSize = size;
	}
	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}

	public boolean isEmpty() {
		return empty;
	}

	public void setEmpty(boolean empty) {
		this.empty = empty;
	}

	public long getTotalElements() {
		return totalElements;
	}
	public void setTotalElements(long totalElements) {
		this.totalElements = totalElements;
	}
	public int getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}
	public int getNumberOfElements() {
		return numberOfElements;
	}
	public void setNumberOfElements(int numberOfElements) {
		this.numberOfElements = numberOfElements;
	}
	public boolean isSorted() {
		return sorted;
	}
	public void setSorted(boolean sorted) {
		this.sorted = sorted;
	}
	public boolean isFirst() {
		return first;
	}
	public void setFirst(boolean first) {
		this.first = first;
	}
	public boolean isLast() {
		return last;
	}
	public void setLast(boolean last) {
		this.last = last;
	}
	
	
}
