package com.gifthommie.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gifthommie.backend.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Integer>{
	
	@Query("SELECT r FROM Role r WHERE r.name = :roleName")
	public Role getRoleByRoleName(@Param("roleName") String roleName);
	
}
