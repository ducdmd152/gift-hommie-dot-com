package com.gifthommie.backend.service;

import java.util.Map;

public interface MailService {
	String createContent(String template, Map<String, Object> variables);
}
