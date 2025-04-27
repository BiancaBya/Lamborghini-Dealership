package com.lamborghini.Lamborghini.utils;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponseDTO {

    private Long id;
    private String email;
    private String role;
    private String firstName;
    private String lastName;

    public LoginResponseDTO(Long id, String email, String role, String firstName, String lastName) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }

}


