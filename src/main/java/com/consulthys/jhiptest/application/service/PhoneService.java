package com.consulthys.jhiptest.application.service;

import com.consulthys.jhiptest.application.service.dto.PhoneDTO;
import java.util.List;

/**
 * Service Interface for managing Phone.
 */
public interface PhoneService {

    /**
     * Save a phone.
     *
     * @param phoneDTO the entity to save
     * @return the persisted entity
     */
    PhoneDTO save(PhoneDTO phoneDTO);

    /**
     * Get all the phones.
     *
     * @return the list of entities
     */
    List<PhoneDTO> findAll();

    /**
     * Get the "id" phone.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PhoneDTO findOne(Long id);

    /**
     * Delete the "id" phone.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the phone corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<PhoneDTO> search(String query);
}
