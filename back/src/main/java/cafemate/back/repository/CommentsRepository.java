package cafemate.back.repository;

import cafemate.back.domain.Cafes;
import cafemate.back.domain.Comments;
import cafemate.back.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentsRepository extends JpaRepository<Comments, Long> {
    List<Comments> findAllByUsersOrderByCreatedAtDesc(Users user);
    List<Comments> findAllByCafesOrderByCreatedAtDesc(Cafes cafe);
}