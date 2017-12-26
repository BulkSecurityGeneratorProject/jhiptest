package com.consulthys.jhiptest.application.repository.search;

import com.consulthys.jhiptest.application.domain.Person;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Person entity.
 */
public interface PersonSearchRepository extends ElasticsearchRepository<Person, Long> {
}
