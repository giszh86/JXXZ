require.config({
	baseUrl: '../../js',
	paths: {
		'imm': 'immersed',
		'mui': 'mui.min',
		'app': 'app',
		'template': 'template'
	}
});

require(['imm', 'mui', 'app', 'template'], function(_, mui, app, template) {
	mui.init();
	mui.plusReady(function() {
		var _page_id = null;
		var _self = plus.webview.currentWebview();
		var item = _self.item;
		var detail=_self.detail;
		var bjclUrl='nsDeal.html';
		if(detail!=0){
			bjclUrl='nsDeal2.html';
		}
		if(detail==1){   //1已办审批详情    -1全部审批详情
			document.getElementById("title").innerHTML="已办审批详情";
		}else if(detail==-1){
			document.getElementById("title").innerHTML="全部审批详情";
		}
		var self = {
			title: '待办审批详情',
			pages: [{
				title: '基本信息',
				url: 'nsBasic.html',
				extras: {
					item: item
				}
			}, {
				title: '意见列表',
				url: 'nsOpinion.html',
				extras: {
					item: item
				}
			}, {
				title: '流转日志',
				url: 'nsLog.html',
				extras: {
					item: item
				}
			}, {
				title: '办结信息',
				url: 'nsTodoit.html',
				extras: {
					item: item
				}
			}, {
				title: '办件处理',
				url: bjclUrl,
				extras: {
					item: item
				}
			}]
		};
		_page_id = self.pages[0].url;

		var _dataList = {
			'list': self.pages
		};
		var _html = template('list-tmp', _dataList);
		var _pages = [];
		for(var i = 0; i < self.pages.length; i++) {
			var page = self.pages[i];
			var tempPage = mui.preload({
				url: page.url,
				id: page.url,
				styles: {
					top: '86px',
					bottom: '0px'
				},
				extras: page.extras || {}
			});
			_pages.push(tempPage);
			_self.append(tempPage);
			if(i > 0) tempPage.hide();
		}
		document.querySelector(".mui-content").innerHTML = _html;

		mui('#sliderSegmentedControl a').each(function(index, item) {
			var that = this;
			that.addEventListener('tap', function() {
				TabTap(index, item);
			}, false);
		});

		function TabTap(index, item) {
			_page_id = _pages[index].id;
			_pages[index].show();
		}

		window.setTimeout(function() {
			plus.webview.show(_self, 'slide-in-right', 500, function() {
				plus.nativeUI.closeWaiting();
			});
		}, 500);

	});
});