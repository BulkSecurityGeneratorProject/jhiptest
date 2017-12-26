package com.consulthys.jhiptest.application.domain;


import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Entry.
 */
@Entity
@Table(name = "entry")
@Document(indexName = "entry")
public class Entry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_type")
    private String type;

    @Column(name = "sort_key")
    private Long sortKey;

    @ManyToOne
    private Organisation organisation;

    @ManyToOne
    private Membership membership;

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

    public Entry type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getSortKey() {
        return sortKey;
    }

    public Entry sortKey(Long sortKey) {
        this.sortKey = sortKey;
        return this;
    }

    public void setSortKey(Long sortKey) {
        this.sortKey = sortKey;
    }

    public Organisation getOrganisation() {
        return organisation;
    }

    public Entry organisation(Organisation organisation) {
        this.organisation = organisation;
        return this;
    }

    public void setOrganisation(Organisation organisation) {
        this.organisation = organisation;
    }

    public Membership getMembership() {
        return membership;
    }

    public Entry membership(Membership membership) {
        this.membership = membership;
        return this;
    }

    public void setMembership(Membership membership) {
        this.membership = membership;
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
        Entry entry = (Entry) o;
        if (entry.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entry.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Entry{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", sortKey=" + getSortKey() +
            "}";
    }
}
