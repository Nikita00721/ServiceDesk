package com.service.Service.controllers;

import com.service.Service.models.RequestType;
import com.service.Service.repo.RequestRepository;
import com.service.Service.repo.RequestTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/")
public class RequestTypeController {
    private final RequestTypeRepository requestTypeRepository;
    private final RequestRepository requestRepository;

    @Autowired
    public RequestTypeController(RequestTypeRepository requestTypeRepository, RequestRepository requestRepository) {
        this.requestTypeRepository = requestTypeRepository;
        this.requestRepository = requestRepository;
    }

    @GetMapping(produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<byte[]> getIndexHtml() {
        try {
            ClassPathResource resource = new ClassPathResource("public/index.html");
            byte[] indexHtml = Files.readAllBytes(Path.of(resource.getURI()));
            return ResponseEntity.ok(indexHtml);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }
    @GetMapping
    public ResponseEntity<List<RequestType>> getAllTypes() {
        List<RequestType> requestTypes = StreamSupport.stream(requestTypeRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        return ResponseEntity.ok(requestTypes);
    }



    @PostMapping
    public ResponseEntity<RequestType> createType(@RequestBody RequestType requestType) {
        if (requestType.getName() == null || requestType.getDescription() == null) {
            return ResponseEntity.badRequest().build();
        }
        RequestType createdType = requestTypeRepository.save(requestType);
        return ResponseEntity.ok(createdType);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RequestType> getTypeById(@PathVariable Long id) {
        Optional<RequestType> requestTypeOptional = requestTypeRepository.findById(id);
        return requestTypeOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RequestType> updateType(@PathVariable Long id, @RequestBody RequestType updatedType) {
        Optional<RequestType> requestTypeOptional = requestTypeRepository.findById(id);
        if (requestTypeOptional.isPresent()) {
            RequestType existingType = requestTypeOptional.get();
            existingType.setName(updatedType.getName());
            existingType.setDescription(updatedType.getDescription());
            RequestType savedType = requestTypeRepository.save(existingType);
            return ResponseEntity.ok(savedType);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteType(@PathVariable Long id) {
        Optional<RequestType> requestTypeOptional = requestTypeRepository.findById(id);
        if (requestTypeOptional.isPresent()) {
            RequestType requestType = requestTypeOptional.get();
            if (requestRepository.findByRequestType(requestType).isEmpty()) {
                requestTypeRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
