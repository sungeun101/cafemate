package cafemate.back.repository;

import cafemate.back.domain.Likes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class LikesRepositoryTest {

    @Autowired
    private LikesRepository likesRepository;

}
