package com.service.Service.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "requests")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    private String email;

    @Column(name = "submission_date")
    private Date submissionDate;

    private String description;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "type_id")
    private RequestType requestType;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getSubmissionDate() {
        return submissionDate;
    }

    public void setSubmissionDate(Date submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public RequestType getRequestType() {
        return requestType;
    }

    public void setRequestType(RequestType requestType) {
        this.requestType = requestType;
    }

    public Long getRequestTypeId() {
        return requestType != null ? requestType.getId() : null;
    }

    public void setRequestTypeId(Long requestTypeId) {
        this.requestType = new RequestType();
        this.requestType.setId(requestTypeId);
    }

    public Request() {
    }

    public Request(String fullName, String email, Date submissionDate, String description) {
        this.fullName = fullName;
        this.email = email;
        this.submissionDate = submissionDate;
        this.description = description;
    }

    @Override
    public String toString() {
        return "Request{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", submissionDate=" + submissionDate +
                ", description='" + description + '\'' +
                ", type=" + requestType +
                '}';
    }
}