package com.consulthys.jhiptest.application.repository.search;

import com.consulthys.jhiptest.application.domain.Membership;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Membership entity.
 */
public interface MembershipSearchRepository extends ElasticsearchRepository<Membership, Long> {
}
