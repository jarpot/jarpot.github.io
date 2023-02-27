package com.aaa.controller;

import com.aaa.util.Result;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("aaa")
public class Login {
    //模拟登录
    /*@RequestMapping("login")
    public String login(String username,String password) throws Exception{
        //代码走到这里会休眠 3秒钟
        Thread.sleep(3000);
        System.out.println("username="+username);
        System.out.println("password="+password);
        return "你好哈哈哈";
    }*/

    @RequestMapping("login")
    public Result login(String username, String password) throws Exception{
        //代码走到这里会休眠 3秒钟
        //Thread.sleep(3000);
        System.out.println("username="+username);
        System.out.println("password="+password);
        return new Result(200,"你好哈哈哈");
    }
}
