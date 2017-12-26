package com.consulthys.jhiptest.application.service.impl;

import com.consulthys.jhiptest.application.service.MembershipService;
import com.consulthys.jhiptest.application.domain.Membership;
import com.consulthys.jhiptest.application.repository.MembershipRepository;
import com.consulthys.jhiptest.application.repository.search.MembershipSearchRepository;
import com.consulthys.jhiptest.application.service.dto.MembershipDTO;
import com.consulthys.jhiptest.application.service.mapper.MembershipMapper;
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
 * Service Implementation for managing Membership.
 */
@Service
@Transactional
public class MembershipServiceImpl implements MembershipService{

    private final Logger log = LoggerFactory.getLogger(MembershipServiceImpl.class);

    private final MembershipRepository membershipRepository;

    private final MembershipMapper membershipMapper;

    private final MembershipSearchRepository membershipSearchRepository;

    public MembershipServiceImpl(MembershipRepository membershipRepository, MembershipMapper membershipMapper, MembershipSearchRepository membershipSearchRepository) {
        this.membershipRepository = membershipRepository;
        this.membershipMapper = membershipMapper;
        this.membershipSearchRepository = membershipSearchRepository;
    }

    /**
     * Save a membership.
     *
     * @param membershipDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MembershipDTO save(MembershipDTO membershipDTO) {
        log.debug("Request to save Membership : {}", membershipDTO);
        Membership membership = membershipMapper.toEntity(membershipDTO);
        membership = membershipRepository.save(membership);
        MembershipDTO result = membershipMapper.toDto(membership);
        membershipSearchRepository.save(membership);
        return result;
    }

    /**
     * Get all the memberships.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MembershipDTO> findAll() {
        log.debug("Request to get all Memberships");
        return membershipRepository.findAll().stream()
            .map(membershipMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one membership by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public MembershipDTO findOne(Long id) {
        log.debug("Request to get Membership : {}", id);
        Membership membership = membershipRepository.findOne(id);
        return membershipMapper.toDto(membership);
    }

    /**
     * Delete the membership by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Membership : {}", id);
        membershipRepository.delete(id);
        membershipSearchRepository.delete(id);
    }

    /**
     * Search for the membership corresponding to the query.
     *
     * @param query the query of the search
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MembershipDTO> search(String query) {
        log.debug("Request to search Memberships for query {}", query);
        return StreamSupport
            .stream(membershipSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(membershipMapper::toDto)
            .collect(Collectors.toList());
    }
}
