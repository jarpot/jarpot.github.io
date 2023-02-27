//定义发布者 公众号
class GongZongHao{
	constructor(name) {
		//定义公众号的名字
	    this.name = name
		//定义一个数组用来存储订阅公众号的用户
		this.subList = []
	}
	//定义订阅公众号的方法
	addUser(user){
        console.log(user.name+'订阅了'+this.name+"公众号")
		this.subList.push(user)
	}
	
	//定义公众号发送消息的方法
	sendMsg(msg){
		console.log(this.name+"公众号发布了消息："+msg)
		this.subList.forEach(item=>{
			item.receive(msg)
		})
	}
}

//定义订阅者  用户
class User{
	constructor(name) {
	    //定义用户的名字
	    this.name = name;
	}
	//定义用户接收信息的方法
	receive(msg){
		console.log(this.name+"接收到了消息："+msg)
	}
}


//定义AAA公众号
let AAA = new GongZongHao('AAA')

//定义用户张三
let zhangsan = new User('张三')
let lisi = new User('李四')
let wangwu = new User('王五')
let zhaoliu = new User('赵六')

//让用户订阅AAA公众号
AAA.addUser(zhangsan)
AAA.addUser(lisi)
AAA.addUser(wangwu)
AAA.addUser(zhaoliu)

//AAA公众号发布消息
AAA.sendMsg('今天是个好天气')