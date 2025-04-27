package com.lamborghini.Lamborghini.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "purchases", uniqueConstraints = @UniqueConstraint(columnNames = {"client", "car"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Purchase extends BaseEntity<Long> {

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    @Column(nullable = false)
    private LocalDate purchaseDate;

}


