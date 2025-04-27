package com.lamborghini.Lamborghini.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "requests", uniqueConstraints = @UniqueConstraint(columnNames = {"client", "car", "requestType"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Request extends BaseEntity<Long> {

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RequestType requestType;

}



