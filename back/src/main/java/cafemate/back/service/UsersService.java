package cafemate.back.service;

import cafemate.back.domain.Users;
import cafemate.back.dto.users.UserSaveRequestDto;
import cafemate.back.dto.users.UsersResponseDto;
import cafemate.back.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityNotFoundException;

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
    public UsersResponseDto findUser(String userId) {
        validateUser(userId);
        Users user = usersRepository.getById(userId);
        return new UsersResponseDto(user);
    }

    // D 유저 탈퇴
    public void deleteUser(String userId) {
        validateUser(userId);
        usersRepository.deleteById(userId);
    }

    // 회원이 있는 지 검증하기 - 함수화
    public void validateUser(String userId) {
        Users user = usersRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
    }
}