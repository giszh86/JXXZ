require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'template':'template'
	}
});

require(['imm', 'mui','app','template'], function(_, mui, app,template) {
	mui.init();
	mui.plusReady(function() {
		var _page_id=null;
		var _self=plus.webview.currentWebview();
		var self={
			title:'行政审批列表-待办/已办/全部',
			pages:[{
				title:'待办审批',
				url:'needshenpi.html',
				extras:{}
			},{
				title:'已办审批',
				url:'alreadyshenpi.html',
				extras:{}
			},{
				title:'全部审批',
				url:'allshenpi.html',
				extras:{}
			}]
		};
		_page_id=self.pages[0].url;
		if(self.pages.length>1){
			var _dataList={'list':self.pages};
			var _html=template('list-tmp',_dataList);
			var _pages=[];
			for (var i=0;i<self.pages.length;i++) {
				var page=self.pages[i];
				console.log(JSON.stringify(page));
				var tempPage=mui.preload({
					url:page.url,
					id:page.url,
					styles:{
						top:'86px',
						bottom:'0px'
						},
						extras:page.extras||{}
					});
					_pages.push(tempPage);
					_self.append(tempPage);
					if(i>0)tempPage.hide();
			}
			document.querySelector(".mui-content").innerHTML=_html;
			
			mui('#sliderSegmentedControl a').each(function(index,item){
				var that=this;
				that.addEventListener('tap',function(){
					TabTap(index,item);
				},false);
			});
			
			function TabTap(index,item){
				_page_id=_pages[index].id;
				_pages[index].show();
				mui.fire(_pages[index], 'refresh');
			}	
			window.setTimeout(function(){
				plus.webview.show(_self,'slide-in-right',500,function(){
					plus.nativeUI.closeWaiting();
				});
			},500);
		}else{
			var subpage=self.pages[0];
			var sub=mui.openWindow({
				url:subpage.url,
				id:subpage.url,
				style:{
					top: '43px',
					bottom: '0px'					
				},
				extras:subpage.extras||{},
				waiting:{
					autoShow:false
				}
			});
			self.append(sub);
			window.setTimeout(function(){
				plus.webview.show(_self,'slide-in-right',500,function(){
					plus.nativeUI.closeWaiting();
				});
			},300);
		}
		
		
	});
})