package com.gifthommie.backend.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {
	
	String uploadImage(String path,MultipartFile file) throws IOException;

	byte[] downloadImage(String imageName);
	
}
