package com.tripbuddies.user.controller;

import com.tripbuddies.user.model.User;
import com.tripbuddies.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {
  @Autowired
  UserRepository userRepository;

  @PostMapping("/addUser")
  public User index(@RequestBody User user)  {
    userRepository.save(user);
    return user;
  }
}
