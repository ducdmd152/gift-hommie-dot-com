package com.gifthommie.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gifthommie.backend.entity.Role;
import com.gifthommie.backend.repository.RoleRepository;

@Service
public class RoleServiceImpl implements RoleService{
	@Autowired
	RoleRepository roleRepository;
	
	@Override
	public Role getRoleByRoleName(String roleName) {
		return roleRepository.getRoleByRoleName(roleName);
	}

	@Override
	public Role getRoleById(Integer id) {
		return roleRepository.getRoleById(id);
	}
}
