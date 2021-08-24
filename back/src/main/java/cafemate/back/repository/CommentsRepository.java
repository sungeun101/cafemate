package cafemate.back.repository;

import cafemate.back.domain.Cafes;
import cafemate.back.domain.Comments;
import cafemate.back.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, Integer> {
    //List<Comments> findAllByUserOrderByCreatedAtDesc(Users user);
    //List<Comments> findAllByCafeOrderByCreatedAtDesc(Cafes cafe);
}