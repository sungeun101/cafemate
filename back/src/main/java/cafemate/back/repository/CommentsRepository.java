package cafemate.back.repository;


import cafemate.back.domain.Comments;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CommentsRepository {
    //@PersistenceContext
    private final EntityManager em;

    public void save(Comments comment) {
        em.persist(comment);
    }

//    public List<Comments> findByCafe (int cafeId) {
//        return em.createQuery("select i from comments i where i.id =:cafeId", Comments.class)
//                .setParameter("cafeId", cafeId)
//                .getResultList();


    public Comments findOne(int id) {
        return em.find(Comments.class, id);
    }

    public List<Comments> findAll() {
        return em.createQuery("select m from Member m", Comments.class)
                .getResultList();
    }

    //cafeId로 바꾸기
    public List<Comments> findByContent( String content) {
        return em.createQuery("select m from Member m where m.content = :content",
                Comments.class)
                .setParameter("content", content)
                .getResultList();
    }
}



