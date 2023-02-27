$(function(){

	//客户服务
	var $ss_list_bg = $('.ss_list_bg');
	$('.ss_listBg').hover(function(){
		$ss_list_bg.slideDown('slow');
	},function(){
		$ss_list_bg.slideUp('slow');
	});


	//购物车
	(function(){
		//** 展示交互
	    var timeoutId;//計時器
	    var $last = $('.last');//购物车主体

	    function fadeOut() {
	        timeoutId = setTimeout(function() {
	            $last.fadeOut('slow');
	        }, 5000)
	    }

	    $('.car_t').hover(function() {
	        clearTimeout(timeoutId)
	        $last.fadeIn('slow');
	    }, fadeOut)

	    $last.hover(function() {
	        clearTimeout(timeoutId)
	    }, fadeOut)


	    //保存购物车的数据
		var cat_obj ={
			// 总价
			totalPrice:0,
			// 总数量
			totalCount:0,
			//商品列表
			list:[
				/*//	第一个商品的数据
				{
					price:0,//danjia
					count:0,//数量
					smallTotalPrice:0//单个商品总价
				},
				//	第二个商品的数据
				{
					price:0,//danjia
					count:0,//数量
					smallTotalPrice:0//单个商品总价
				},
				//	第三个商品的数据
				{
					price:0,//danjia
					count:0,//数量
					smallTotalPrice:0//单个商品总价
				},*/
			]
		}
		var $shop = $('.shop');
		var $noshop = $('.noshop');

		//初始化
		(function(){
			var $li = $('li', $shop)
	        if (!$li.length) {
	            $shop.hide()
	            $noshop.show()
	            return;
	        }

	        $li.each(function(index) {
	            var smallTotalPrice
	            // 取值
	            var price = $('.J_smallTotalPrice', $(this)).text()
	            var count = $('.J_inputCount', $(this)).val()
	            console.log(price);
	            console.log(count);
	            // // 值转换number
	            price = Number(price.slice(1));
	            count = Number(count);
	            smallTotalPrice = price * count

	            cat_obj.list.push({
	                price: price,
	                count: count,
	                smallTotalPrice: smallTotalPrice
	            })
	        })
	        console.log(cat_obj);
	        render(-1);
		})();	

		//添加商品
		$('.J_btnAddCount').on('click',function(){
			var $li = $('li',$shop);
			var index =$li.index($(this).parents('li'));
			console.log(index);
			var count = $('.J_inputCount',$li.eq(index)).val();
			count++;
			// $('.J_inputCount',$li.eq(index)).val(count);
			//改变数值
			changeNum(index,count);

		});
		//减少商品
		$('.J_btnDelCount').on('click',function(){
			var $li = $('li',$shop);
			var index =$li.index($(this).parents('li'));
			console.log(index);
			var count = $('.J_inputCount',$li.eq(index)).val();
			count--;
			//TODO   判断count不能小于0，等于0提醒用户是否删除商品
			// count == 0   删除商品（1.页面商品节点删除  2.cat_obj对象中对应的商品数据删除）
			//TODO  (注意删除的商品的下标)
			 // del();

			 if(count<1){
			 	if(window.confirm('是否删除商品')){
			 		$li.eq(index).remove();///页面商品节点删除
			 		cat_obj.list.splice(index,1); //cat_obj对象中对应的商品数据删除
			 		var $li = $('li', $shop);
			        if (!$li.length) {
			            $shop.hide();
			            $noshop.show();
			        }
			 		render(-1);
			 	}
			 }else{
			 	// $('.J_inputCount',$li.eq(index)).val(count);  //在render方法中已经实现
				//改变数值
				changeNum(index,count);
			 }

			
		});
		//改变数值
		function changeNum(index,count){
			var price = cat_obj.list[index].price;//单价不变，	
			cat_obj.list[0] = {
				price:price,
				count:count,
				smallTotalPrice:price*count
			}
			console.log(cat_obj);
			render(index);
		}
		//渲染数据
		function render(index){
			if(index>-1){
				var $li = $('li',$shop);
				var $item = $li.eq(index);//节点对象
				var item = cat_obj.list[0];//数据对象

				$('.J_inputCount', $item).val(item.count);
	            $('.J_count', $item).text('共'+item.count+'件商品');
	            $('.J_smallTotalPrice', $item).text('￥'+item.smallTotalPrice);
			}
			
         //    //总价总数量
         //    // 渲染统计
	        cat_obj.totalCount = 0;
	        cat_obj.totalPrice = 0;
	        $.map(cat_obj.list, function(item) {
	        	console.log(item);
	            cat_obj.totalCount = cat_obj.totalCount+item.count
	            cat_obj.totalPrice += item.smallTotalPrice
	        })
            $('.J_totalPrice').text('￥'+ cat_obj.totalPrice);
            $('.J_totalCount').text('(' + cat_obj.totalCount +')');
		}


		// x号删除商品
		$('.close J_btnDelete').on('click',function(){
			//TODO
			 // del();
		});
		// TODO   删除方法封装一下(del)，    哪里使用，哪里调用 (注意删除的商品的下标)

	})();




	//快讯
	(function(){
		var marginTop = 0;
		var timer = null;
		function timers(){
			timer = setInterval(function(){
				$('#express li').first().animate({'marginTop':marginTop--},0,function(){
					if(-marginTop>$(this).height()){
						$(this).css({'margin-top':'0px'}).appendTo($('#express'));
						marginTop = 0;
					}
				})
			},50);
		}
		timers();
		$('#express').hover(function(){
			clearInterval(timer);
		},function(){
			timers();
		});
	})();

});