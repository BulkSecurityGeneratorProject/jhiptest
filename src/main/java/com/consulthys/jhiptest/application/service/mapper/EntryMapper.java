package com.consulthys.jhiptest.application.service.mapper;

import com.consulthys.jhiptest.application.domain.*;
import com.consulthys.jhiptest.application.service.dto.EntryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Entry and its DTO EntryDTO.
 */
@Mapper(componentModel = "spring", uses = {OrganisationMapper.class, MembershipMapper.class})
public interface EntryMapper extends EntityMapper<EntryDTO, Entry> {

    @Mapping(source = "organisation.id", target = "organisationId")
    @Mapping(source = "membership.id", target = "membershipId")
    EntryDTO toDto(Entry entry); 

    @Mapping(source = "organisationId", target = "organisation")
    @Mapping(source = "membershipId", target = "membership")
    Entry toEntity(EntryDTO entryDTO);

    default Entry fromId(Long id) {
        if (id == null) {
            return null;
        }
        Entry entry = new Entry();
        entry.setId(id);
        return entry;
    }
}
