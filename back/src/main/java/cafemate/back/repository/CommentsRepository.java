package cafemate.back.repository;

import cafemate.back.domain.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments, Long> {
    List<Comments> findAllById(Long id);
}