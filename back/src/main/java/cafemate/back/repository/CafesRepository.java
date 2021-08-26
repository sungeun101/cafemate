package cafemate.back.repository;

import cafemate.back.domain.Cafes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CafesRepository extends JpaRepository<Cafes, Long> {
    List<Cafes> findAllByDong(String dong);
}


