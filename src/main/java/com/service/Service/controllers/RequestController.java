package com.service.Service.controllers;

import com.service.Service.models.Request;
import com.service.Service.models.RequestType;
import com.service.Service.repo.RequestRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import com.service.Service.repo.RequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api/requests")
public class RequestController {
    @Autowired
    private RequestTypeRepository requestTypeRepository;
    private RequestRepository requestRepository;

    public RequestController(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @GetMapping
    public ResponseEntity<List<Request>> getAllRequests() {
        List<Request> requests = StreamSupport.stream(requestRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return ResponseEntity.ok(requests);
    }

    @PostMapping
    public ResponseEntity<Request> addRequest(@RequestBody Request request) {
        if (request.getRequestType() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Optional<RequestType> requestTypeOptional = requestTypeRepository.findById(request.getRequestType().getId());
        if (requestTypeOptional.isPresent()) {
            RequestType requestType = requestTypeOptional.get();
            request.setRequestType(requestType);
            request.setSubmissionDate(new Date());
            Request savedRequest = requestRepository.save(request);
            return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable("id") Long id) {
        Optional<Request> requestOptional = requestRepository.findById(id);
        if (requestOptional.isPresent()) {
            Request request = requestOptional.get();
            return new ResponseEntity<>(request, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Request> updateRequest(@PathVariable("id") Long id, @RequestBody Request updatedRequest) {
        RequestType requestType = updatedRequest.getRequestType();
        if (requestType == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Optional<Request> requestOptional = requestRepository.findById(id);
        if (requestOptional.isPresent()) {
            Request request = requestOptional.get();
            Optional<RequestType> requestTypeOptional = requestTypeRepository.findById(requestType.getId());
            if (requestTypeOptional.isPresent()) {
                request.setFullName(updatedRequest.getFullName());
                request.setEmail(updatedRequest.getEmail());
                request.setDescription(updatedRequest.getDescription());
                request.setRequestType(requestType);
                Request savedRequest = requestRepository.save(request);
                return new ResponseEntity<>(savedRequest, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteRequest(@PathVariable("id") Long id) {
        Optional<Request> requestOptional = requestRepository.findById(id);
        if (requestOptional.isPresent()) {
            Request request = requestOptional.get();
            requestRepository.delete(request);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
