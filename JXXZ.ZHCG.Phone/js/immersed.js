(function(w) {

	//	document.addEventListener('plusready', function() {
	//		console.log("Immersed-UserAgent: " + navigator.userAgent);
	//	}, false);

	var immersed = 0;
	var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
	if(ms && ms.length >= 3) {
		immersed = parseFloat(ms[2]);
	}
	if(!immersed) immersed = 0; 
	w.immersed = immersed;

	//var t = document.getElementById('header');
	var t = document.querySelector('header');
	t && (t.style.paddingTop = immersed + 'px',
		//t.style.background = '-webkit-linear-gradient(top,rgba(215,75,40,1),rgba(215,75,40,0.8))', 
		//t.style.background = '-webkit-linear-gradient(top,rgba(0,0,147,1),rgba(185,185,255,0.8))',
		//t.style.color = '#FFF',
		t.style.height = (t.offsetHeight + immersed) + 'px'
	);
	t = document.querySelector('.mui-content');
	t && (t.style.marginTop = immersed + 'px');
	//	t = document.getElementById('content');
	//	t && (t.style.marginTop = immersed + 'px');
	//	t = document.getElementById('dcontent');
	//	t && (t.style.marginTop = immersed + 'px');
	//	t = document.getElementById('map');
	//	t && (t.style.marginTop = immersed + 'px');



})(window);