package com.consulthys.jhiptest.application.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Phone.
 */
@Entity
@Table(name = "phone")
@Document(indexName = "phone")
public class Phone implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "internal")
    private Boolean internal;

    @Column(name = "jhi_external")
    private Boolean external;

    @Column(name = "jhi_number")
    private String number;

    @OneToOne
    @JoinColumn(unique = true)
    private Entry entry;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public Phone type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean isInternal() {
        return internal;
    }

    public Phone internal(Boolean internal) {
        this.internal = internal;
        return this;
    }

    public void setInternal(Boolean internal) {
        this.internal = internal;
    }

    public Boolean isExternal() {
        return external;
    }

    public Phone external(Boolean external) {
        this.external = external;
        return this;
    }

    public void setExternal(Boolean external) {
        this.external = external;
    }

    public String getNumber() {
        return number;
    }

    public Phone number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Entry getEntry() {
        return entry;
    }

    public Phone entry(Entry entry) {
        this.entry = entry;
        return this;
    }

    public void setEntry(Entry entry) {
        this.entry = entry;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Phone phone = (Phone) o;
        if (phone.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), phone.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Phone{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", internal='" + isInternal() + "'" +
            ", external='" + isExternal() + "'" +
            ", number='" + getNumber() + "'" +
            "}";
    }
}
