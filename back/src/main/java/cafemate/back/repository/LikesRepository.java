package cafemate.back.repository;

import cafemate.back.domain.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO likes(user_id, cafe_id) VALUES(:userId, :cafeId)",nativeQuery = true)
    void likes(@Param("userId") String userId, @Param("cafeId") Long cafeId);


    @Transactional
    @Modifying
    @Query(value = "DELETE FROM likes WHERE user_id = :userId AND cafe_id = :cafeId", nativeQuery = true)
    void cancelLikes(@Param("userId")String userId, @Param("cafeId") Long cafeId);


}
