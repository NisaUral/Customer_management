package com.manage.customer_backend.service.impl;

import com.manage.customer_backend.entity.Customer;
import com.manage.customer_backend.repository.CustomerRepository;
import com.manage.customer_backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor

public class CustomerServiceImpl implements CustomerService {
    public CustomerRepository customerRepository;
    @Override
    public List<Customer> bringAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Customer bringOneCustomer(Long Id) {
        return customerRepository.findById(Id).orElseThrow(()-> new RuntimeException("Customer not found."));
    }

    @Override
    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Long id, Customer customer) {
        Customer ourCustomer=customerRepository.findById(id).orElseThrow(()->new RuntimeException("Customer not found"));
        ourCustomer.setAd(customer.getAd());
        ourCustomer.setSoyad(customer.getSoyad());
        ourCustomer.setEmail(customer.getEmail());
        ourCustomer.setNumara(customer.getNumara());
        ourCustomer.setIl(customer.getIl());
        ourCustomer.setIlce(customer.getIlce());
        ourCustomer.setMeslek(customer.getMeslek());


        return customerRepository.save(ourCustomer);
    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);

    }
}
