package cafemate.back.repository;

import cafemate.back.domain.Cafes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CafesRepository extends JpaRepository<Cafes,Long> {
    List<Cafes> findAllByOrder();//전체 리스트


}
