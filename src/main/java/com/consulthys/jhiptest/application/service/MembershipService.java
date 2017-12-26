package com.consulthys.jhiptest.application.service;

import com.consulthys.jhiptest.application.service.dto.MembershipDTO;
import java.util.List;

/**
 * Service Interface for managing Membership.
 */
public interface MembershipService {

    /**
     * Save a membership.
     *
     * @param membershipDTO the entity to save
     * @return the persisted entity
     */
    MembershipDTO save(MembershipDTO membershipDTO);

    /**
     * Get all the memberships.
     *
     * @return the list of entities
     */
    List<MembershipDTO> findAll();

    /**
     * Get the "id" membership.
     *
     * @param id the id of the entity
     * @return the entity
     */
    MembershipDTO findOne(Long id);

    /**
     * Delete the "id" membership.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the membership corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<MembershipDTO> search(String query);
}
