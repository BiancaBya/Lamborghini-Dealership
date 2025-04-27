package com.lamborghini.Lamborghini.utils;

import com.lamborghini.Lamborghini.domain.Car;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CarEvent {
    public enum Type { CREATED, UPDATED, DELETED }
    private Type type;
    private Car car;
}



