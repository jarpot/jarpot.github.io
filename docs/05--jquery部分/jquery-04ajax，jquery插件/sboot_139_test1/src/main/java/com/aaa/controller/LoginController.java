package com.aaa.controller;

import com.aaa.util.Result;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;

@CrossOrigin
@RestController
@RequestMapping("user")
public class LoginController {

    @RequestMapping("/register")
    public Result userReg(String username,String password){
        System.out.println("开始注册"+username+","+password);
        ArrayList<HashMap<String,String>> maps = SysDataBase.maps;

        if(maps.size()>0){
            System.out.println(maps+"===");
            for (HashMap map : maps) {
                String username1 = (String) map.get("username");
                if(username1.equals(username)){
                    return new Result(300,"该用户名已经注册过了！");
                }
            }
        }
        //如果以上都没有，此时完成插入操作 新增
        HashMap<String, String> smap = new HashMap<>();
        smap.put("username",username);
        smap.put("password",password);
        maps.add(smap);
        System.out.println(maps);
        return new Result(200,"注册成功，请登录！");
    }

    @RequestMapping("/login")
    public String useLogin(String username,String password){
        System.out.println("开始登录"+username+",,"+password);
        ArrayList<HashMap<String,String>> maps = SysDataBase.maps;
        System.out.println(maps);
        if(maps.size()>0){
            for (HashMap map : maps) {
                String username1 = (String) map.get("username");
                //System.out.println(username1);
                String password1 = (String) map.get("password");
                //System.out.println(password1);
                if(!username1.equals(username) || !password1.equals(password)){
                    return "用户名或者密码错误！";
                }
            }
        }
        return "登录成功！";
    }
}
