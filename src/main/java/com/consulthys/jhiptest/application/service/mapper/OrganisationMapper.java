package com.consulthys.jhiptest.application.service.mapper;

import com.consulthys.jhiptest.application.domain.*;
import com.consulthys.jhiptest.application.service.dto.OrganisationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Organisation and its DTO OrganisationDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OrganisationMapper extends EntityMapper<OrganisationDTO, Organisation> {

    @Mapping(source = "parent.id", target = "parentId")
    OrganisationDTO toDto(Organisation organisation); 

    @Mapping(source = "parentId", target = "parent")
    @Mapping(target = "phones", ignore = true)
    @Mapping(target = "membership", ignore = true)
    @Mapping(target = "child", ignore = true)
    Organisation toEntity(OrganisationDTO organisationDTO);

    default Organisation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Organisation organisation = new Organisation();
        organisation.setId(id);
        return organisation;
    }
}
