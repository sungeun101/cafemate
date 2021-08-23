package cafemate.back.controller;

import cafemate.back.dto.users.UserSaveRequestDto;
import cafemate.back.dto.users.UsersResponseDto;
import cafemate.back.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;

    // C 회원 등록
    @PostMapping("/users")
    public void saveUser(@RequestBody @Validated UserSaveRequestDto userSaveRequestDto) {
        usersService.joinUser(userSaveRequestDto);
    }

    // R 회원 조회
    @GetMapping("/users/{user-id}")
    public UsersResponseDto getUser(@PathVariable(value = "user-id") Integer userId) {
        return usersService.findUser(userId);
    }

    // U 회원 삭제
    @DeleteMapping("/users/{user-id}")
    public void deleteUser(@PathVariable(value = "user-id") Integer userId) {
        usersService.deleteUser(userId);
    }
}