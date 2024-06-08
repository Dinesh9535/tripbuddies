package com.tripbuddies.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.tripbuddies.model.Account;
import com.tripbuddies.service.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor(onConstructor_ = @Autowired)
@RequestMapping("/account-api")
public class AccountController {
    @Autowired
    AccountService accountService;

    @PostMapping("/addAccount")
    @Operation(description = "save user details to DB")
    public Account addUser(@RequestBody Account account) {
        return accountService.addUser(account);
    }

    @PostMapping("/updateAccount")
    @Operation(description = "Update user details to DB")
    public Account updateUser(@RequestBody Account account) {
        return accountService.updateUser(account);
    }

    @GetMapping("/deleteAccount")
    @Operation(description = "Deletes user from DB")
    public void deleteUser(@RequestParam String userId) {
        accountService.deleteUser(userId);
    }

    @GetMapping(value = "/getAccount", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @Operation(description = "Get User by User Id")
    public Account getUser(@RequestParam String userId) {
        return accountService.fetchUser(userId);
    }
}
