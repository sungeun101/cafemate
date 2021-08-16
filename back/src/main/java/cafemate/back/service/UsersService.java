package cafemate.back.service;

import cafemate.back.domain.Users;
import cafemate.back.dto.users.UserSaveRequestDto;
import cafemate.back.dto.users.UsersResponseDto;
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
    public void joinUser(UserSaveRequestDto userSaveRequestDto) {
        Users users = userSaveRequestDto.toEntity();
        usersRepository.save(users);
    }

    // R 유저 조회
    @Transactional(readOnly = true)
    public UsersResponseDto findUser(Integer userId) {
        Users user = usersRepository.getById(userId);
        UsersResponseDto usersResponseDto = new UsersResponseDto (user);
        return usersResponseDto;
    }

    // D 유저 탈퇴
    public void deleteUser(Integer userId) {
        usersRepository.deleteById(userId);
    }
}