package com.tripbuddies.service;

import com.tripbuddies.exception.AccountNotFoundException;
import com.tripbuddies.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tripbuddies.model.Account;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor_ = @Autowired)
public class AccountService {
    @Autowired
    AccountRepository accountRepository;

    public Account addUser(Account account) {
        return accountRepository.save(account);
    }

    public Account updateUser(Account account) {
        return accountRepository.save(account);
    }

    public void deleteUser(String userId) {
        accountRepository.deleteById(userId);
    }

    public Account fetchUser(String userId) {
        return accountRepository.findById(userId).orElseThrow(() -> new AccountNotFoundException(userId));
    }
}
