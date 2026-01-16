package com.manage.customer_backend.controller;

import com.manage.customer_backend.entity.Customer;
import com.manage.customer_backend.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    // --- İŞTE SİHİRLİ DOKUNUŞ (MANUEL CONSTRUCTOR) ---
    // Bu kısım Garson ile Şef arasındaki telefon hattını kurar.
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }
    // -------------------------------------------------

    @GetMapping
    public List<Customer> bringAllCustomers(){
        return customerService.bringAllCustomers();
    }

    @GetMapping("/{id}")
    public Customer bringOneCustomer(@PathVariable Long id){
        return customerService.bringOneCustomer(id);
    }

    @PostMapping
    public Customer addCustomer(@RequestBody Customer customer){
        // Hata veren satir burasiydi, artik duzeldi.
        return customerService.saveCustomer(customer);
    }

    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customer){
        return customerService.updateCustomer(id, customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable Long id){
        customerService.deleteCustomer(id);
    }
}