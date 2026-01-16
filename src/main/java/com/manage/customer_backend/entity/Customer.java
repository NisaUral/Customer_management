package com.manage.customer_backend.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="customers")

public class Customer {
    public void setId(Long id) {
        this.id = id;
    }

    public void setAd(String ad) {
        this.ad = ad;
    }

    public void setSoyad(String soyad) {
        this.soyad = soyad;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNumara(String numara) {
        this.numara = numara;
    }

    public void setIl(String il) {
        this.il = il;
    }

    public void setIlce(String ilce) {
        this.ilce = ilce;
    }

    public void setMeslek(String meslek) {
        this.meslek = meslek;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="ad",nullable = false,length = 30)
    private String ad;
    @Column(name="soyad",nullable = false,length = 30)
    private String soyad;
    @Column(name="email",unique = true,length = 50)
    private String email;
    @Column(name="numara",length = 20)
    private String numara;
    @Column(name="il",length = 20)
    private String il;
    @Column(name="ilce",length = 30)
    private String ilce;
    @Column(name="meslek",length = 50)
    private String meslek;


    public Long getId() {
        return id;
    }

    public String getAd() {
        return ad;
    }

    public String getSoyad() {
        return soyad;
    }

    public String getEmail() {
        return email;
    }

    public String getNumara() {
        return numara;
    }

    public String getIl() {
        return il;
    }

    public String getIlce() {
        return ilce;
    }

    public String getMeslek() {
        return meslek;
    }
}