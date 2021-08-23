package cafemate.back.service;

import cafemate.back.domain.Users;
import cafemate.back.repository.UsersRepository;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityNotFoundException;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UsersServiceTest {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    UsersService usersService;
    // DTO <-> Entity 변환을 service에서 하므로,
    // 원래 이 테스트코드에서는 usersRepository만을 사용하나,
    // (service단에서는 인자/리턴값으로 dto를 받기에)
    // usersService.validateUser()만을 사용하기 위해서 usersService를 가져옴.

    @BeforeEach
    Users buildUser() {
        String name = "유저이름";
        String email = "유저@gmail.com";
        return Users.builder().name(name).email(email).build();
    }

    @Test
    public void 회원가입() throws Exception {
        //given
        Users user = buildUser();

        //when
        usersRepository.save(user);
        Users findUser = usersRepository.getById(user.getId());

        //then
        assertEquals(findUser.getName(), user.getName());
        assertEquals(findUser.getEmail(), user.getEmail());
    }

    @Test
    public void 회원조회() throws Exception {
        //given : 없는 회원일 경우
        Integer userId = Integer.MAX_VALUE;

        //when
        try {
            usersService.validateUser(userId); // => 회원을 찾을 수 없는 에러발생
        } catch (EntityNotFoundException e) {
            return;
        }

        //then
        fail("회원을 찾을 수 없음");
    }

    @Test
    public void 회원탈퇴() throws Exception {
        //given
        Users user = buildUser();
        usersRepository.save(user);
        Users findUser = usersRepository.getById(user.getId());

        //when
        usersRepository.deleteById(user.getId());
        Users deleteComment = usersRepository.findById(user.getId()).orElse(null);

        //then
        assertNull(deleteComment);
    }

}
