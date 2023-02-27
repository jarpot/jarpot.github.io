$(function(){
	var $list_ul = $('.cate_list');
	var $list = $('.cate_list li').toArray();

	var isDesc = true;//jiangxu

	$('#sortPrice').on('click',function(){
		console.log($list);

		isDesc = !isDesc;
		$list.sort(function(li1,li2){
			var price1 = $('.price span',li1).text().slice(1)-0;
			var price2 = $('.price span',li2).text().slice(1)-0;

			var res = price1 - price2;
			return isDesc? -res:res;
		});

		$list_ul.empty();
		$list_ul.append($list);

		return false;
	});
});