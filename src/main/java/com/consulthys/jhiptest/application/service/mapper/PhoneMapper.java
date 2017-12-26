package com.consulthys.jhiptest.application.service.mapper;

import com.consulthys.jhiptest.application.domain.*;
import com.consulthys.jhiptest.application.service.dto.PhoneDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Phone and its DTO PhoneDTO.
 */
@Mapper(componentModel = "spring", uses = {OrganisationMapper.class, MembershipMapper.class})
public interface PhoneMapper extends EntityMapper<PhoneDTO, Phone> {

    @Mapping(source = "organisation.id", target = "organisationId")
    @Mapping(source = "membership.id", target = "membershipId")
    PhoneDTO toDto(Phone phone); 

    @Mapping(source = "organisationId", target = "organisation")
    @Mapping(source = "membershipId", target = "membership")
    Phone toEntity(PhoneDTO phoneDTO);

    default Phone fromId(Long id) {
        if (id == null) {
            return null;
        }
        Phone phone = new Phone();
        phone.setId(id);
        return phone;
    }
}
