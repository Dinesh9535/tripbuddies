package com.tripbuddies.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tripbuddies.user.model.User;
import com.tripbuddies.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/addUser")
    @Operation(description = "save user details to DB")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PostMapping("/updateUser")
    @Operation(description = "Update user details to DB")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @GetMapping("/deleteUser")
    @Operation(description = "Deletes user from DB")
    public void deleteUser(@RequestParam String userId) {
        userService.deleteUser(userId);
    }

    @GetMapping(value = "/getUser", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @Operation(description = "Get User by User Id")
    public User getUser(@RequestParam String userId) {
        return userService.fetchUser(userId);
    }
}
