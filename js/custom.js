$( document ).ready(function() {
	
	"use strict";
	
	$('.employer .hidden-content').hide();
	$('.accordion .tab').on('click', function() {
  	$(this).find('.employer > .hidden-content').slideToggle();
	});
		
	
	$('.pie_progress').asPieProgress({
		'namespace': 'pie_progress',
		min: 0, 
		max: 100,
		goal: 100, // 100%
		size: 80, // in px
		speed: 40, // speed of 1/100
		barcolor: '#ef1e25',
		barsize: '2',
		trackcolor: '#f2f2f2',
		fillcolor: 'none',
		easing: 'ease'
	});

		
	$(".service_item").hover(function(){
		$(this).children('.pie_progress').asPieProgress('start');
	});

});


