require.config({
	baseUrl: '../../js',
	paths: {
		'mui': 'mui',
		'app': 'app',
		'Vue': 'vue/vue.min',
		'imm': 'immersed'
	}
});

require(['mui', 'app', 'Vue'], function(mui, app, Vue) {
	mui.init({
		swipeBack: false
	});

	mui('.mui-scroll-wrapper').scroll({
		indicators: true //是否显示滚动条
	});

	document.getElementById('slider').addEventListener('slide', function(e) {
		if(e.detail.slideNumber === 1) {

		} else if(e.detail.slideNumber === 2) {

		}
		var dom = document.querySelector('.mui-slider-group');
	});

	(function() {
		mui.ready(function() {
			var height = window.innerHeight;
			console.log(height);
			var doms = document.querySelectorAll('.mui-control-content');
			for(var i = 0; i < doms.length; i++) {
				var dom = doms[i];
				dom.style.minHeight = (height - 95) + 'px';
			}

		});

	})();

});