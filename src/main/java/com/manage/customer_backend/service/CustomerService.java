package com.manage.customer_backend.service;

import com.manage.customer_backend.entity.Customer;

import java.util.List;

public interface CustomerService {
    List<Customer>bringAllCustomers();
    Customer bringOneCustomer(Long Id);
    Customer saveCustomer(Customer customer);
    Customer updateCustomer(Long id,Customer customer);
    void deleteCustomer(Long id);
}
