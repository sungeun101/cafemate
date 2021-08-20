package cafemate.back.repository;

import cafemate.back.domain.Cafes;
import cafemate.back.domain.Likes;
import cafemate.back.domain.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    Likes findLikesByUserAndCafe(Users user, Cafes cafe);
    void deleteLikesByCafe(Cafes cafe);

    @Modifying
    @Query(value = "INSERT INTO likes(user_id, cafe_id) VALUES(:userId, :cafeId)",nativeQuery = true)
    void likes(long userId, long cafeId);

    @Modifying
    @Query(value = "DELETE FROM likes WHERE user_id = :userId AND cafe_id = :cafeId", nativeQuery = true)
    void cancelLikes(long userId, long cafeId);

}
