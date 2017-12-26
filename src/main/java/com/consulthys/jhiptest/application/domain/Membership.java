package com.consulthys.jhiptest.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Membership.
 */
@Entity
@Table(name = "membership")
@Document(indexName = "membership")
public class Membership implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "function_name")
    private String functionName;

    @Column(name = "sort_key")
    private Long sortKey;

    @ManyToOne
    private Person person;

    @OneToOne
    @JoinColumn(unique = true)
    private Organisation organisation;

    @OneToMany(mappedBy = "membership")
    @JsonIgnore
    private Set<Phone> phones = new HashSet<>();

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

    public Membership type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFunctionName() {
        return functionName;
    }

    public Membership functionName(String functionName) {
        this.functionName = functionName;
        return this;
    }

    public void setFunctionName(String functionName) {
        this.functionName = functionName;
    }

    public Long getSortKey() {
        return sortKey;
    }

    public Membership sortKey(Long sortKey) {
        this.sortKey = sortKey;
        return this;
    }

    public void setSortKey(Long sortKey) {
        this.sortKey = sortKey;
    }

    public Person getPerson() {
        return person;
    }

    public Membership person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Organisation getOrganisation() {
        return organisation;
    }

    public Membership organisation(Organisation organisation) {
        this.organisation = organisation;
        return this;
    }

    public void setOrganisation(Organisation organisation) {
        this.organisation = organisation;
    }

    public Set<Phone> getPhones() {
        return phones;
    }

    public Membership phones(Set<Phone> phones) {
        this.phones = phones;
        return this;
    }

    public Membership addPhones(Phone phone) {
        this.phones.add(phone);
        phone.setMembership(this);
        return this;
    }

    public Membership removePhones(Phone phone) {
        this.phones.remove(phone);
        phone.setMembership(null);
        return this;
    }

    public void setPhones(Set<Phone> phones) {
        this.phones = phones;
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
        Membership membership = (Membership) o;
        if (membership.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), membership.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Membership{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", functionName='" + getFunctionName() + "'" +
            ", sortKey=" + getSortKey() +
            "}";
    }
}
