package com.service.Service.controllers;

import com.service.Service.models.RequestType;
import com.service.Service.repo.RequestRepository;
import com.service.Service.repo.RequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/types")
@CrossOrigin(origins = "http://localhost:3000")
public class RequestTypeController {
    private RequestTypeRepository requestTypeRepository;
    private RequestRepository requestRepository;

    @Autowired
    public RequestTypeController(RequestTypeRepository requestTypeRepository, RequestRepository requestRepository) {
        this.requestTypeRepository = requestTypeRepository;
        this.requestRepository = requestRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestType> getTypeById(@PathVariable("id") Long id) {
        Optional<RequestType> requestTypeOptional = requestTypeRepository.findById(id);
        if (requestTypeOptional.isPresent()) {
            RequestType requestType = requestTypeOptional.get();
            return ResponseEntity.ok(requestType);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/")
    public ResponseEntity<Iterable<RequestType>> getAllTypes() {
        Iterable<RequestType> requestTypes = requestTypeRepository.findAll();
        return ResponseEntity.ok(requestTypes);
    }

    @PostMapping("/")
    public ResponseEntity<RequestType> addType(@RequestBody RequestType requestType) {
        if (requestType.getName().isEmpty() || requestType.getDescription().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        RequestType savedRequestType = requestTypeRepository.save(requestType);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRequestType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteType(@PathVariable Long id) {
        Optional<RequestType> requestTypeOptional = requestTypeRepository.findById(id);
        if (requestTypeOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        RequestType requestType = requestTypeOptional.get();
        if (!requestRepository.findByRequestType(requestType).isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        requestTypeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<RequestType> updateType(@PathVariable Long id, @RequestBody RequestType updatedRequestType) {
        Optional<RequestType> requestTypeOptional = requestTypeRepository.findById(id);
        if (requestTypeOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        RequestType existingRequestType = requestTypeOptional.get();
        existingRequestType.setName(updatedRequestType.getName());
        existingRequestType.setDescription(updatedRequestType.getDescription());

        RequestType savedRequestType = requestTypeRepository.save(existingRequestType);
        return ResponseEntity.ok(savedRequestType);
    }
}
