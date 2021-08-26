package cafemate.back.controller;

import cafemate.back.dto.users.UserSaveRequestDto;
import cafemate.back.dto.users.UsersResponseDto;
import cafemate.back.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;

    // C 회원 등록
    @PostMapping("/users")
    public ResponseEntity saveUser(@RequestBody @Validated UserSaveRequestDto userSaveRequestDto) {
        usersService.joinUser(userSaveRequestDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    // R 회원 조회
    @GetMapping("/users/{user-id}")
    public ResponseEntity<UsersResponseDto> getUser(@PathVariable(value = "user-id") Long userId) {
        return new ResponseEntity(usersService.findUser(userId), HttpStatus.OK);
    }

    // U 회원 삭제
    @DeleteMapping("/users/{user-id}")
    public ResponseEntity deleteUser(@PathVariable(value = "user-id") Long userId) {
        usersService.deleteUser(userId);
        return new ResponseEntity(HttpStatus.OK);
    }
}