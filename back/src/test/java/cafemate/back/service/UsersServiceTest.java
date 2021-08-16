package cafemate.back.service;

import cafemate.back.dto.users.UserSaveRequestDto;
import cafemate.back.dto.users.UsersResponseDto;
import cafemate.back.repository.UsersRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class UsersServiceTest {

    @Autowired UsersRepository usersRepository;
    @Autowired UsersService usersService;

    @Test
    @Rollback(value = false)
    public void 회원가입() throws Exception {
        UserSaveRequestDto userA = new UserSaveRequestDto();
        UserSaveRequestDto userB = new UserSaveRequestDto();

        userA.setEmail("userA@gmail.com");
        userB.setEmail("userB@gmail.com");

        userA.setName("userA");
        userB.setName("userB");

        usersService.joinUser(userA);
        usersService.joinUser(userB);
    }

    @Test
    @Rollback(value = false)
    public void 회원조회() throws Exception {
        UsersResponseDto user = usersService.findUser(1);
        System.out.println(user.getEmail());
    }

    @Test
    @Rollback(value = false)
    public void 회원탈퇴() throws Exception {
        usersService.deleteUser(2);
    }
}
