package com.gifthommie.backend.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.apache.tomcat.jni.Time;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;import com.gifthommie.backend.exception.NotFoundException;

@Service
public class FileServiceImpl implements FileService {

	@Override
	public String uploadImage(String path, MultipartFile file) throws IOException  {
		
		//file name
		String name = System.currentTimeMillis() + file.getOriginalFilename();
		//full path
		String filePath = path + File.separator + name;
		System.out.println(filePath);
		//create folder if not created
		File f = new File(path);
		if(!f.exists()) {
			f.mkdir();
			
		}
		//file copy 
			Files.copy(file.getInputStream(),Paths.get(filePath));
		
		return name;
	}

	@Override
	public byte[] downloadImage(String imageName) {
		return null;
	}

}
