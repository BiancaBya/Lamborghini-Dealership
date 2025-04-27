package com.lamborghini.Lamborghini.utils;

import com.lamborghini.Lamborghini.domain.Request;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequestEvent {
    public enum Type { CREATED, ACCEPTED, REJECTED }
    private Type type;
    private Request request;
}



