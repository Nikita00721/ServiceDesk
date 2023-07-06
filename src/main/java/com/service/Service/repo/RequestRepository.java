package com.service.Service.repo;

import org.springframework.data.repository.CrudRepository;
import com.service.Service.models.Request;

public interface RequestRepository extends CrudRepository<Request, Long> {
}
