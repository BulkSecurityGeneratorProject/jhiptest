package com.consulthys.jhiptest.application.service.impl;

import com.consulthys.jhiptest.application.service.OrganisationService;
import com.consulthys.jhiptest.application.domain.Organisation;
import com.consulthys.jhiptest.application.repository.OrganisationRepository;
import com.consulthys.jhiptest.application.repository.search.OrganisationSearchRepository;
import com.consulthys.jhiptest.application.service.dto.OrganisationDTO;
import com.consulthys.jhiptest.application.service.mapper.OrganisationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Organisation.
 */
@Service
@Transactional
public class OrganisationServiceImpl implements OrganisationService{

    private final Logger log = LoggerFactory.getLogger(OrganisationServiceImpl.class);

    private final OrganisationRepository organisationRepository;

    private final OrganisationMapper organisationMapper;

    private final OrganisationSearchRepository organisationSearchRepository;

    public OrganisationServiceImpl(OrganisationRepository organisationRepository, OrganisationMapper organisationMapper, OrganisationSearchRepository organisationSearchRepository) {
        this.organisationRepository = organisationRepository;
        this.organisationMapper = organisationMapper;
        this.organisationSearchRepository = organisationSearchRepository;
    }

    /**
     * Save a organisation.
     *
     * @param organisationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrganisationDTO save(OrganisationDTO organisationDTO) {
        log.debug("Request to save Organisation : {}", organisationDTO);
        Organisation organisation = organisationMapper.toEntity(organisationDTO);
        organisation = organisationRepository.save(organisation);
        OrganisationDTO result = organisationMapper.toDto(organisation);
        organisationSearchRepository.save(organisation);
        return result;
    }

    /**
     * Get all the organisations.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OrganisationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Organisations");
        return organisationRepository.findAll(pageable)
            .map(organisationMapper::toDto);
    }


    /**
     *  get all the organisations where Membership is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<OrganisationDTO> findAllWhereMembershipIsNull() {
        log.debug("Request to get all organisations where Membership is null");
        return StreamSupport
            .stream(organisationRepository.findAll().spliterator(), false)
            .filter(organisation -> organisation.getMembership() == null)
            .map(organisationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     *  get all the organisations where Child is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<OrganisationDTO> findAllWhereChildIsNull() {
        log.debug("Request to get all organisations where Child is null");
        return StreamSupport
            .stream(organisationRepository.findAll().spliterator(), false)
            .filter(organisation -> organisation.getChild() == null)
            .map(organisationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one organisation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OrganisationDTO findOne(Long id) {
        log.debug("Request to get Organisation : {}", id);
        Organisation organisation = organisationRepository.findOne(id);
        return organisationMapper.toDto(organisation);
    }

    /**
     * Delete the organisation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Organisation : {}", id);
        organisationRepository.delete(id);
        organisationSearchRepository.delete(id);
    }

    /**
     * Search for the organisation corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OrganisationDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Organisations for query {}", query);
        Page<Organisation> result = organisationSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(organisationMapper::toDto);
    }
}
