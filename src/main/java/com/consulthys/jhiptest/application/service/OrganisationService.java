package com.consulthys.jhiptest.application.service;

import com.consulthys.jhiptest.application.service.dto.OrganisationDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * Service Interface for managing Organisation.
 */
public interface OrganisationService {

    /**
     * Save a organisation.
     *
     * @param organisationDTO the entity to save
     * @return the persisted entity
     */
    OrganisationDTO save(OrganisationDTO organisationDTO);

    /**
     * Get all the organisations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<OrganisationDTO> findAll(Pageable pageable);
    /**
     * Get all the OrganisationDTO where Membership is null.
     *
     * @return the list of entities
     */
    List<OrganisationDTO> findAllWhereMembershipIsNull();
    /**
     * Get all the OrganisationDTO where Child is null.
     *
     * @return the list of entities
     */
    List<OrganisationDTO> findAllWhereChildIsNull();

    /**
     * Get the "id" organisation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OrganisationDTO findOne(Long id);

    /**
     * Delete the "id" organisation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the organisation corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<OrganisationDTO> search(String query, Pageable pageable);
}
