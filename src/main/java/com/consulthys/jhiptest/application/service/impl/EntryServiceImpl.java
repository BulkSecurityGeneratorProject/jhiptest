package com.consulthys.jhiptest.application.service.impl;

import com.consulthys.jhiptest.application.service.EntryService;
import com.consulthys.jhiptest.application.domain.Entry;
import com.consulthys.jhiptest.application.repository.EntryRepository;
import com.consulthys.jhiptest.application.repository.search.EntrySearchRepository;
import com.consulthys.jhiptest.application.service.dto.EntryDTO;
import com.consulthys.jhiptest.application.service.mapper.EntryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Entry.
 */
@Service
@Transactional
public class EntryServiceImpl implements EntryService{

    private final Logger log = LoggerFactory.getLogger(EntryServiceImpl.class);

    private final EntryRepository entryRepository;

    private final EntryMapper entryMapper;

    private final EntrySearchRepository entrySearchRepository;

    public EntryServiceImpl(EntryRepository entryRepository, EntryMapper entryMapper, EntrySearchRepository entrySearchRepository) {
        this.entryRepository = entryRepository;
        this.entryMapper = entryMapper;
        this.entrySearchRepository = entrySearchRepository;
    }

    /**
     * Save a entry.
     *
     * @param entryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EntryDTO save(EntryDTO entryDTO) {
        log.debug("Request to save Entry : {}", entryDTO);
        Entry entry = entryMapper.toEntity(entryDTO);
        entry = entryRepository.save(entry);
        EntryDTO result = entryMapper.toDto(entry);
        entrySearchRepository.save(entry);
        return result;
    }

    /**
     * Get all the entries.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<EntryDTO> findAll() {
        log.debug("Request to get all Entries");
        return entryRepository.findAll().stream()
            .map(entryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one entry by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EntryDTO findOne(Long id) {
        log.debug("Request to get Entry : {}", id);
        Entry entry = entryRepository.findOne(id);
        return entryMapper.toDto(entry);
    }

    /**
     * Delete the entry by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Entry : {}", id);
        entryRepository.delete(id);
        entrySearchRepository.delete(id);
    }

    /**
     * Search for the entry corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<EntryDTO> search(String query) {
        log.debug("Request to search Entries for query {}", query);
        return StreamSupport
            .stream(entrySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(entryMapper::toDto)
            .collect(Collectors.toList());
    }
}
