package com.service.Service.models;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "request_types")
public class RequestType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @OneToMany(mappedBy = "requestType", fetch = FetchType.EAGER)
    private Set<Request> requestSet;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Request> getRequestSet() {
        return requestSet;
    }

    public void setRequestSet(Set<Request> requestSet) {
        this.requestSet = requestSet;
    }


    public RequestType(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public RequestType() {
    }

    @Override
    public String toString() {
        return "RequestType{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }

}