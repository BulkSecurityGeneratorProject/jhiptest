package com.consulthys.jhiptest.application.service;

import com.consulthys.jhiptest.application.service.dto.EntryDTO;
import java.util.List;

/**
 * Service Interface for managing Entry.
 */
public interface EntryService {

    /**
     * Save a entry.
     *
     * @param entryDTO the entity to save
     * @return the persisted entity
     */
    EntryDTO save(EntryDTO entryDTO);

    /**
     * Get all the entries.
     *
     * @return the list of entities
     */
    List<EntryDTO> findAll();

    /**
     * Get the "id" entry.
     *
     * @param id the id of the entity
     * @return the entity
     */
    EntryDTO findOne(Long id);

    /**
     * Delete the "id" entry.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the entry corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @return the list of entities
     */
    List<EntryDTO> search(String query);
}
