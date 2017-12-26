package com.consulthys.jhiptest.application.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Entry entity.
 */
public class EntryDTO implements Serializable {

    private Long id;

    private String type;

    private Long sortKey;

    private Long organisationId;

    private Long membershipId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getSortKey() {
        return sortKey;
    }

    public void setSortKey(Long sortKey) {
        this.sortKey = sortKey;
    }

    public Long getOrganisationId() {
        return organisationId;
    }

    public void setOrganisationId(Long organisationId) {
        this.organisationId = organisationId;
    }

    public Long getMembershipId() {
        return membershipId;
    }

    public void setMembershipId(Long membershipId) {
        this.membershipId = membershipId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EntryDTO entryDTO = (EntryDTO) o;
        if(entryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EntryDTO{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", sortKey=" + getSortKey() +
            "}";
    }
}
