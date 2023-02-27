//定义创建公众号的构造函数
function GongZhongHao(name){
    //定义公众号的名字
    this.name = name;
    //定义数组存储 关注公众号的用户
    this.subList = [];
}
//给公众号添加动作 关注动作，
GongZhongHao.prototype.addUser = function(user){
    console.log(user.name+'订阅了'+this.name+"公众号")
    //向数组中添加用户
    this.subList.push(user)
}
//发布动作
GongZhongHao.prototype.sendMsg = function(msg){
    console.log(this.name+"公众号---发布了消息")
    this.subList.forEach(user=>{
        //调用用户接收信息的方法
        user.receive(msg)
    })
}

//定义创建用户对象的构造函数
function User(name){
    this.name = name;
}
//给用户添加动作:接收信息的动作
User.prototype.receive = function(msg){
    console.log(this.name+'接收到了消息：'+ msg)
}


//1.创建AAA公众号
let AAA = new GongZhongHao('AAA');

//2.创建四个用户 
let u1 = new User('张三');
let u2 = new User('李四');
let u3 = new User('王五');
let u4 = new User('赵六');

//3.让用户关注AAA公众号
AAA.addUser(u1);
AAA.addUser(u2);
AAA.addUser(u3);
AAA.addUser(u4);

//4.公众号发布消息
AAA.sendMsg('今天天气真不错')