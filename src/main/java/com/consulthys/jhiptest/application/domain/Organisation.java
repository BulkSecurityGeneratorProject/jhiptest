package com.consulthys.jhiptest.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Organisation.
 */
@Entity
@Table(name = "organisation")
@Document(indexName = "organisation")
public class Organisation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "name")
    private String name;

    @Column(name = "short_name")
    private String shortName;

    @Column(name = "sort_key")
    private Long sortKey;

    @OneToOne
    @JoinColumn(unique = true)
    private Organisation parent;

    @OneToMany(mappedBy = "organisation")
    @JsonIgnore
    private Set<Entry> entries = new HashSet<>();

    @OneToOne(mappedBy = "organisation")
    @JsonIgnore
    private Membership membership;

    @OneToOne(mappedBy = "parent")
    @JsonIgnore
    private Organisation child;

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

    public Organisation type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public Organisation name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortName() {
        return shortName;
    }

    public Organisation shortName(String shortName) {
        this.shortName = shortName;
        return this;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public Long getSortKey() {
        return sortKey;
    }

    public Organisation sortKey(Long sortKey) {
        this.sortKey = sortKey;
        return this;
    }

    public void setSortKey(Long sortKey) {
        this.sortKey = sortKey;
    }

    public Organisation getParent() {
        return parent;
    }

    public Organisation parent(Organisation organisation) {
        this.parent = organisation;
        return this;
    }

    public void setParent(Organisation organisation) {
        this.parent = organisation;
    }

    public Set<Entry> getEntries() {
        return entries;
    }

    public Organisation entries(Set<Entry> entries) {
        this.entries = entries;
        return this;
    }

    public Organisation addEntries(Entry entry) {
        this.entries.add(entry);
        entry.setOrganisation(this);
        return this;
    }

    public Organisation removeEntries(Entry entry) {
        this.entries.remove(entry);
        entry.setOrganisation(null);
        return this;
    }

    public void setEntries(Set<Entry> entries) {
        this.entries = entries;
    }

    public Membership getMembership() {
        return membership;
    }

    public Organisation membership(Membership membership) {
        this.membership = membership;
        return this;
    }

    public void setMembership(Membership membership) {
        this.membership = membership;
    }

    public Organisation getChild() {
        return child;
    }

    public Organisation child(Organisation organisation) {
        this.child = organisation;
        return this;
    }

    public void setChild(Organisation organisation) {
        this.child = organisation;
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
        Organisation organisation = (Organisation) o;
        if (organisation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), organisation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Organisation{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", name='" + getName() + "'" +
            ", shortName='" + getShortName() + "'" +
            ", sortKey=" + getSortKey() +
            "}";
    }
}
