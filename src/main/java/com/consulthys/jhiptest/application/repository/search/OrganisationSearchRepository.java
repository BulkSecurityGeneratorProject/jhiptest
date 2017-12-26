package com.consulthys.jhiptest.application.repository.search;

import com.consulthys.jhiptest.application.domain.Organisation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Organisation entity.
 */
public interface OrganisationSearchRepository extends ElasticsearchRepository<Organisation, Long> {
}
