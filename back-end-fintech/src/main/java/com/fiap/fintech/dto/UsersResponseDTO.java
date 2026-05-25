package com.fiap.fintech.dto;

public class UsersResponseDTO {

    private String userid;
    private String name;
    private String email;

    public UsersResponseDTO(String userid, String name, String email) {
        this.userid = userid;
        this.name = name;
        this.email = email;
    }

    public String getUserid() { return userid; }
    public String getName() { return name; }
    public String getEmail() { return email; }
}