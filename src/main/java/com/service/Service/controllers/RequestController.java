package com.service.Service.controllers;

import com.service.Service.models.Request;
import com.service.Service.models.RequestType;
import com.service.Service.repo.RequestRepository;
import com.service.Service.repo.RequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:3000")
public class RequestController {
    private RequestRepository requestRepository;
    private RequestTypeRepository requestTypeRepository;

    @Autowired
    public RequestController(RequestRepository requestRepository, RequestTypeRepository requestTypeRepository) {
        this.requestRepository = requestRepository;
        this.requestTypeRepository = requestTypeRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequest(@PathVariable("id") Long id) {
        try {
            Optional<Request> requestOptional = requestRepository.findById(id);
            if (requestOptional.isPresent()) {
                Request request = requestOptional.get();
                RequestType requestType = request.getRequestType(); // Получение типа заявки
                request.setRequestType(requestType); // Установка типа заявки в объект заявки
                return ResponseEntity.ok(request);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    @PostMapping("/add")
    public ResponseEntity<String> addRequest(@RequestBody Request request) {
        try {
            Optional<RequestType> requestTypeOptional = requestTypeRepository.findById(request.getRequestType().getId());
            if (!requestTypeOptional.isPresent()) {
                throw new IllegalArgumentException("Invalid request type");
            }

            RequestType selectedRequestType = requestTypeOptional.get();
            request.setRequestType(selectedRequestType);
            request.setSubmissionDate(new Date());

            Request savedRequest = requestRepository.save(request);
            return ResponseEntity.ok("Request added successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid request type");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }


    @GetMapping("/type/{requestTypeId}")
    public ResponseEntity<List<Request>> getRequestsByType(@PathVariable("requestTypeId") Long requestTypeId) {
        try {
            Optional<RequestType> requestTypeOptional = requestTypeRepository.findById(requestTypeId);
            if (requestTypeOptional.isPresent()) {
                RequestType requestType = requestTypeOptional.get();
                List<Request> requests = requestRepository.findByRequestType(requestType);
                return ResponseEntity.ok(requests);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }


    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable(value = "id") long id) {
        Request deleteRequest = requestRepository.findById(id).orElseThrow();
        requestRepository.delete(deleteRequest);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateRequest(@RequestBody Request updatedRequest) {
        try {
            if (updatedRequest.getRequestType() == null) {
                throw new IllegalArgumentException("Invalid request type");
            }

            RequestType requestType = requestTypeRepository.findById(updatedRequest.getRequestType().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid request type id: " + updatedRequest.getRequestType().getId()));

            Request existingRequest = requestRepository.findById(updatedRequest.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid request id: " + updatedRequest.getId()));

            existingRequest.setFullName(updatedRequest.getFullName());
            existingRequest.setEmail(updatedRequest.getEmail());
            existingRequest.setDescription(updatedRequest.getDescription());
            existingRequest.setRequestType(requestType);

            Request savedRequest = requestRepository.save(existingRequest);
            return ResponseEntity.ok("Request updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid request type or request id");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }
}
