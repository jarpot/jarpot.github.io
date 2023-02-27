package com.aaa;

//import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author: hy
 * @create: 2021-10-22 08:56:21
 */
@SpringBootApplication
//@MapperScan("com.aaa.mapper")
public class MyApp {
    public static void main(String[] args) {
        //启动springboot项目
        SpringApplication.run(MyApp.class,args);
    }
}
