package com.service.Service.repo;

import com.service.Service.models.RequestType;
import org.springframework.data.repository.CrudRepository;
import com.service.Service.models.Request;

import java.util.List;

public interface RequestRepository extends CrudRepository<Request, Long> {
    List<Request> findByType(RequestType type);
}
