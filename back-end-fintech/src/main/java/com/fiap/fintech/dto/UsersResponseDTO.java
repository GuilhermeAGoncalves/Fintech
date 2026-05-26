package com.fiap.fintech.DTO;

public class UsersResponseDTO {

    private String userid;

    public UsersResponseDTO(String userid) {
        this.userid = userid;
    }

    public String getUserid() { return userid; }
}