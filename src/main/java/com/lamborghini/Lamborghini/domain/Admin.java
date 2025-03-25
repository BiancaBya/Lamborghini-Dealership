package com.lamborghini.Lamborghini.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "admins")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Admin extends BaseEntity<Long> {

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

}





