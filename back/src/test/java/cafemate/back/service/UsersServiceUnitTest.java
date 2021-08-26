package cafemate.back.service;

import cafemate.back.domain.Users;
import cafemate.back.repository.UsersRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UsersServiceUnitTest {

    @Mock // 유닛테스트에서의 레포지토리 : @Mock 이용
    private UsersRepository usersRepository;

    @Before
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    // 유닛테스트에서만 사용할 Mock 데이터
    private Users getStubUser() {
        String name = "유저네임";
        String email = "유저@gmail.com";
        String img_path = "유저프로필사진주소";

        return Users.builder()
                .name(name)
                .email(email)
                .img_path(img_path)
                .build();
    }

    @Test
    public void 회원가입() throws Exception {
        //given : 저장했던 엔티티(mock 데이터로 저장)와 같은 객체 반환
        Users user = getStubUser();
        when(usersRepository.save(any(Users.class))).then(AdditionalAnswers.returnsFirstArg());

        //when : save 실행 시, getStubComment()이 실행됨 => 저장한 Users 엔티티가 리턴
        Users savedUser = usersRepository.save(user);

        //then
        assertEquals(savedUser.getName(), user.getName());
        assertEquals(savedUser.getEmail(), user.getEmail());
        assertEquals(savedUser.getImg_path(), user.getImg_path());
    }

    @Test
    public void 회원조회() throws Exception {
        //given
        when(usersRepository.getById(any())).thenReturn(getStubUser());

        //when
        Users findUser = usersRepository.getById(any());

        //then
        assertEquals(findUser.getId(), getStubUser().getId());
        assertEquals(findUser.getEmail(), getStubUser().getEmail());
        assertEquals(findUser.getName(), getStubUser().getName());
    }

    @Test
    public void 회원탈퇴() throws Exception {
        //given
        when(usersRepository.getById(any())).thenReturn(getStubUser());
        Users comment = usersRepository.getById(any());
        Long userId = comment.getId();

        //when
        usersRepository.deleteById(userId);
        Users deleteUser = usersRepository.findById(userId).orElse(null);

        //then
        assertNull(deleteUser);
    }

}