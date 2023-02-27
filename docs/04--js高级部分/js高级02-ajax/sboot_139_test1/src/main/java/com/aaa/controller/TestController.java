package com.aaa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author: hy
 * @create: 2021-10-22 09:27:54
 */
@CrossOrigin
@Controller
public class TestController {

    @RequestMapping("/hello")
    @ResponseBody  // 将返回的内容作为响应的主体传给浏览器,不加这个注解的话
                   // 返回的字符串会做为页面视图名查找视图页面
    public String hello(){
        /*try {
            //线程休眠5秒
            //Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }*/
        int i = 0;
        if(i==0){
            return "请求成功";
        }else{
            return "请求失败";
        }
    }

}
