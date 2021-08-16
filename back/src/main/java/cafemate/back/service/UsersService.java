package cafemate.back.service;

import cafemate.back.domain.Users;
import cafemate.back.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class UsersService {

    private final UsersRepository usersRepository;

    // C 유저 등록
    public void joinUser(Users users) {
        usersRepository.save(users);
    }

    // D 유저 탈퇴
    public void deleteUser(Integer userId) {
        usersRepository.deleteById(userId);
    }
}