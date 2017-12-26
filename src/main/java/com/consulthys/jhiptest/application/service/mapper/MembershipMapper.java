package com.consulthys.jhiptest.application.service.mapper;

import com.consulthys.jhiptest.application.domain.*;
import com.consulthys.jhiptest.application.service.dto.MembershipDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Membership and its DTO MembershipDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class, OrganisationMapper.class})
public interface MembershipMapper extends EntityMapper<MembershipDTO, Membership> {

    @Mapping(source = "person.id", target = "personId")
    @Mapping(source = "organisation.id", target = "organisationId")
    MembershipDTO toDto(Membership membership); 

    @Mapping(source = "personId", target = "person")
    @Mapping(source = "organisationId", target = "organisation")
    @Mapping(target = "entries", ignore = true)
    Membership toEntity(MembershipDTO membershipDTO);

    default Membership fromId(Long id) {
        if (id == null) {
            return null;
        }
        Membership membership = new Membership();
        membership.setId(id);
        return membership;
    }
}
