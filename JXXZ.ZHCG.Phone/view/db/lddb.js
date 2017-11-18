require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
	}
});

require(['imm', 'mui', 'app'], function(_, mui, app) {
	mui.init({
		
	});

	mui.plusReady(function() {
		var title_list=['未督办列表','自己督办列表','他人督办列表'];
		mui('.mui-table-view').on('tap','.mui-table-view-cell',function(){
		  	var _type=this.dataset.type;
		  	url = 'ybajList.html';
			mui.openWindow({
				url: url,
				id: url,
				extras:{
					type:_type,
					title:title_list[_type-1]
				}
			});
		}) 
	});
});