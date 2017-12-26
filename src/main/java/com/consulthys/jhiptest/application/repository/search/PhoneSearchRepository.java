package com.consulthys.jhiptest.application.repository.search;

import com.consulthys.jhiptest.application.domain.Phone;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Phone entity.
 */
public interface PhoneSearchRepository extends ElasticsearchRepository<Phone, Long> {
}
