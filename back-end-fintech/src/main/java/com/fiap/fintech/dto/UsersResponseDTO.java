package com.fiap.fintech.dto;

public class UsersResponseDTO {

    private String userid;

    public UsersResponseDTO(String userid) {
        this.userid = userid;
    }

    public String getUserid() { return userid; }
}