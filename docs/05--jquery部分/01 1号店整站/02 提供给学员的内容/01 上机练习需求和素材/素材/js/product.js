$(function(){
	//尺码颜色
	(function(){
		var $choice1 = $('#choice1');
		var $li1 = $('li' ,$choice1);

		var $choice2 = $('#choice2');
		var $li2 = $('li' ,$choice2);

		$li1.on('click',function(){
			$(this).addClass('checked').siblings().removeClass('checked');
		})
		$li2.on('click',function(){
			$(this).addClass('checked').siblings().removeClass('checked');
		})
	})();

	//商品增加删除
	(function(){
		var num = 1;
		$('.n_btn_1').on('click',function(){
			num++;
			$('.n_ipt').val(num);
		});
		$('.n_btn_2').on('click',function(){
			num--;
			if(num<1)num =1;
			$('.n_ipt').val(num);
		});
	})();

	//推荐
	(function(){
		var tjlist = {
			list:[],
			count:1,
			totalprice:0
		};

		var $teamlist = $('.team_list');
		var $check = $('.checkbox input');
		var $sum_ipt = $('.sum_ipt');
		var $totalprice = $('.team_sum span');

		// 初始化
		$teamlist.each(function(){
			var price = $('.price span',$(this)).text().slice(1)-0;
			// var ischeck = $('.price .checkbox input',$(this)).attr('checked');
			var ischeck = $('.price .checkbox input',$(this)).is(':checked');
			console.log(ischeck);

			tjlist.list.push({
				price:price,
				ischeck:ischeck
			});
			console.log(tjlist);
			// 渲染数据
			render();
		})
		function render(){
			tjlist.totalprice = 0;
			$.map(tjlist.list,function(item){
				if(item.ischeck){
					tjlist.totalprice += item.price*tjlist.count;	
				}
			})
			$totalprice.text(tjlist.totalprice);
		}

		//xuanze  点击了复选框
		$check.on('click',function(){
			console.log(this.checked);
			var index = $check.index($(this));
			console.log(index);
			tjlist.list[index].ischeck = this.checked;
			render();
		});
		
		$sum_ipt.on('change',function(){
			var newcount = $(this).val();
			if(/^[0-9]*$/.test(newcount)){
				tjlist.count = newcount;
			}else{
				alert('请输入合法数值');
			}
			render();
		});
	})()

});