package com.gifthommie.backend.controller;

import java.io.IOException;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.gifthommie.backend.entity.FileResponse;
import com.gifthommie.backend.service.FileService;

@RestController
@RequestMapping("/public")
public class FileController {
	
	@Autowired
	private FileService fileService;
	
	@Value("${project.image}")
	private String path;
	
	@PostMapping("/file/upload")
	public ResponseEntity<FileResponse> fileUpload(
			@RequestParam("image") MultipartFile image){
		
		String fileName=null;
		String imgUrl=null;
		try {
			fileName = fileService.uploadImage(path, image);
			imgUrl="http://localhost:8080/"+path+fileName;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return  new ResponseEntity<>(new FileResponse(null, "Image is not upload due to error!",imgUrl),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(new FileResponse(fileName, "Image is successfully upload!",imgUrl),HttpStatus.OK);
		
	}
}
