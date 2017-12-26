package com.consulthys.jhiptest.application.service.impl;

import com.consulthys.jhiptest.application.service.PhoneService;
import com.consulthys.jhiptest.application.domain.Phone;
import com.consulthys.jhiptest.application.repository.PhoneRepository;
import com.consulthys.jhiptest.application.repository.search.PhoneSearchRepository;
import com.consulthys.jhiptest.application.service.dto.PhoneDTO;
import com.consulthys.jhiptest.application.service.mapper.PhoneMapper;
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
 * Service Implementation for managing Phone.
 */
@Service
@Transactional
public class PhoneServiceImpl implements PhoneService{

    private final Logger log = LoggerFactory.getLogger(PhoneServiceImpl.class);

    private final PhoneRepository phoneRepository;

    private final PhoneMapper phoneMapper;

    private final PhoneSearchRepository phoneSearchRepository;

    public PhoneServiceImpl(PhoneRepository phoneRepository, PhoneMapper phoneMapper, PhoneSearchRepository phoneSearchRepository) {
        this.phoneRepository = phoneRepository;
        this.phoneMapper = phoneMapper;
        this.phoneSearchRepository = phoneSearchRepository;
    }

    /**
     * Save a phone.
     *
     * @param phoneDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PhoneDTO save(PhoneDTO phoneDTO) {
        log.debug("Request to save Phone : {}", phoneDTO);
        Phone phone = phoneMapper.toEntity(phoneDTO);
        phone = phoneRepository.save(phone);
        PhoneDTO result = phoneMapper.toDto(phone);
        phoneSearchRepository.save(phone);
        return result;
    }

    /**
     * Get all the phones.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PhoneDTO> findAll() {
        log.debug("Request to get all Phones");
        return phoneRepository.findAll().stream()
            .map(phoneMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one phone by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PhoneDTO findOne(Long id) {
        log.debug("Request to get Phone : {}", id);
        Phone phone = phoneRepository.findOne(id);
        return phoneMapper.toDto(phone);
    }

    /**
     * Delete the phone by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Phone : {}", id);
        phoneRepository.delete(id);
        phoneSearchRepository.delete(id);
    }

    /**
     * Search for the phone corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<PhoneDTO> search(String query) {
        log.debug("Request to search Phones for query {}", query);
        return StreamSupport
            .stream(phoneSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(phoneMapper::toDto)
            .collect(Collectors.toList());
    }
}
