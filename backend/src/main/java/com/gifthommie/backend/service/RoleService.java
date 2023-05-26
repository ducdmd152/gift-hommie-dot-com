package com.gifthommie.backend.service;

import com.gifthommie.backend.entity.Role;

public interface RoleService {
	public Role getRoleByRoleName(String roleName);

	public Role getRoleById(Integer id);
}
