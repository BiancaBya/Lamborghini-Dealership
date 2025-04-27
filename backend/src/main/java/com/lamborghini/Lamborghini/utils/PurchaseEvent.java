package com.lamborghini.Lamborghini.utils;

import com.lamborghini.Lamborghini.domain.Purchase;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PurchaseEvent {
    public enum Type { CREATED, DELETED }
    private Type type;
    private Purchase purchase;
}



