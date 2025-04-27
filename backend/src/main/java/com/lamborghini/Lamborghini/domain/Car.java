package com.lamborghini.Lamborghini.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.*;

@Entity
@Table(name = "cars", uniqueConstraints = @UniqueConstraint(columnNames = {"model", "year", "horsepower", "price"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Car extends BaseEntity<Long> {

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private int year;

    @Column(nullable = false)
    private int horsepower;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private int stock;

}



