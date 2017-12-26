package com.consulthys.jhiptest.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.consulthys.jhiptest.application.service.MembershipService;
import com.consulthys.jhiptest.application.web.rest.errors.BadRequestAlertException;
import com.consulthys.jhiptest.application.web.rest.util.HeaderUtil;
import com.consulthys.jhiptest.application.service.dto.MembershipDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Membership.
 */
@RestController
@RequestMapping("/api")
public class MembershipResource {

    private final Logger log = LoggerFactory.getLogger(MembershipResource.class);

    private static final String ENTITY_NAME = "membership";

    private final MembershipService membershipService;

    public MembershipResource(MembershipService membershipService) {
        this.membershipService = membershipService;
    }

    /**
     * POST  /memberships : Create a new membership.
     *
     * @param membershipDTO the membershipDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new membershipDTO, or with status 400 (Bad Request) if the membership has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/memberships")
    @Timed
    public ResponseEntity<MembershipDTO> createMembership(@RequestBody MembershipDTO membershipDTO) throws URISyntaxException {
        log.debug("REST request to save Membership : {}", membershipDTO);
        if (membershipDTO.getId() != null) {
            throw new BadRequestAlertException("A new membership cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MembershipDTO result = membershipService.save(membershipDTO);
        return ResponseEntity.created(new URI("/api/memberships/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /memberships : Updates an existing membership.
     *
     * @param membershipDTO the membershipDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated membershipDTO,
     * or with status 400 (Bad Request) if the membershipDTO is not valid,
     * or with status 500 (Internal Server Error) if the membershipDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/memberships")
    @Timed
    public ResponseEntity<MembershipDTO> updateMembership(@RequestBody MembershipDTO membershipDTO) throws URISyntaxException {
        log.debug("REST request to update Membership : {}", membershipDTO);
        if (membershipDTO.getId() == null) {
            return createMembership(membershipDTO);
        }
        MembershipDTO result = membershipService.save(membershipDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, membershipDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /memberships : get all the memberships.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of memberships in body
     */
    @GetMapping("/memberships")
    @Timed
    public List<MembershipDTO> getAllMemberships() {
        log.debug("REST request to get all Memberships");
        return membershipService.findAll();
        }

    /**
     * GET  /memberships/:id : get the "id" membership.
     *
     * @param id the id of the membershipDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the membershipDTO, or with status 404 (Not Found)
     */
    @GetMapping("/memberships/{id}")
    @Timed
    public ResponseEntity<MembershipDTO> getMembership(@PathVariable Long id) {
        log.debug("REST request to get Membership : {}", id);
        MembershipDTO membershipDTO = membershipService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(membershipDTO));
    }

    /**
     * DELETE  /memberships/:id : delete the "id" membership.
     *
     * @param id the id of the membershipDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/memberships/{id}")
    @Timed
    public ResponseEntity<Void> deleteMembership(@PathVariable Long id) {
        log.debug("REST request to delete Membership : {}", id);
        membershipService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/memberships?query=:query : search for the membership corresponding
     * to the query.
     *
     * @param query the query of the membership search
     * @return the result of the search
     */
    @GetMapping("/_search/memberships")
    @Timed
    public List<MembershipDTO> searchMemberships(@RequestParam String query) {
        log.debug("REST request to search Memberships for query {}", query);
        return membershipService.search(query);
    }

}
