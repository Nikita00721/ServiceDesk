package com.service.Service.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "requests")
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "request_type")
    private String requestType;

    @Column(name = "full_name")
    private String fullName;

    private String email;

    @Column(name = "submission_date")
    private Date submissionDate;

    private String description;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private RequestType type;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRequestType() {
        return requestType;
    }

    public void setRequestType(String requestType) {
        this.requestType = requestType;
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

    public RequestType getType() {
        return type;
    }

    public void setType(RequestType type) {
        this.type = type;
    }

    public Request() {
    }

    @Override
    public String toString() {
        return "Request{" +
                "id=" + id +
                ", requestType='" + requestType + '\'' +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", submissionDate=" + submissionDate +
                ", description='" + description + '\'' +
                ", type=" + type +
                '}';
    }
}