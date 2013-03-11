var girl = [
	{ "objectPosX":"-28" , "objectPosY":"-5" , "objectWidth":".47" , "objectDepthDeltaX":"2" , "objectDepthDeltaY":"1.3" },
	{ "objectPosX":"24" , "objectPosY":"-19" , "objectWidth":".44" , "objectDepthDeltaX":"1" , "objectDepthDeltaY":"1" },
	{ "objectPosX":"102" , "objectPosY":"31" , "objectWidth":"1" , "objectDepthDeltaX":"2" , "objectDepthDeltaY":"1.3" },
];

var	currentPosX = 50,
	currentPosY = 0,
	distanceX = 50,
	distanceY = 0,
	durationX = 1000,
	durationY = 500,
	easingType = 'linear';
	// easingType = 'easeOutCirc';
	
var object1PosX = -30,
	object1PosY = 8,
	object1Width = 15,
	object1DepthDeltaX = 2,
	object1DepthDeltaY = 1.3;

var object2PosX = 40,
	object2PosY = 25,
	object2Width = 20,
	object2DepthDeltaX = 1,
	object2DepthDeltaY = 1;
	
var zoomed = false; 

$(document).ready(function(){

	function move(direction){

		switch(direction) {
			// left
			case 'left':
				if (currentPosX-distanceX<0) return;

				currentPosX = currentPosX - distanceX;
				$('#wrapper').stop().animate({
					backgroundPosition: currentPosX+'% '+currentPosY+'%'
				}, durationX, easingType);

				leftX = '+'+distanceX+'%';
				$('.flirt').stop().animate({
					marginLeft: '+=550px'
				}, durationX, easingType);

				break;
			// right
			case 'right':
				if (currentPosX+distanceX>100) return;
				currentPosX = currentPosX + distanceX;
				$('#wrapper').stop().animate({
					backgroundPosition: currentPosX+'% '+currentPosY+'%'
				}, durationX, easingType);

				leftX = '-'+distanceX+'%';
				$('.flirt').stop().animate({
					marginLeft: '-=550px'
				}, durationX, easingType);

				break;
			// up
			case 38:
				return;
				if (currentPosY==0) return;
				currentPosY = currentPosY - distanceY;
				currentPosY<0?currentPosY=0:null;
				$('#wrapper').stop().animate({
					backgroundPosition: currentPosX+'% '+currentPosY+'%'
				}, durationY, easingType);

				object1PosY = object1PosY + (distanceY);
				$('#object1').stop().animate({
					left: object1PosX+'%',
					top: object1PosY+'%'
				}, durationY, easingType);

				object2PosY = object2PosY + (distanceY/object2DepthDeltaY);
				$('#object2_flirt').stop().animate({
					left: object2PosX+'%',
					top: object2PosY+'%'
				}, durationY, easingType);

				break;
			// down
			case 40:
				return;
				if (currentPosY==100) return;
				currentPosY = currentPosY + distanceY;
				currentPosY>100?currentPosY=100:null;
				$('#wrapper').stop().animate({
					backgroundPosition: currentPosX+'% '+currentPosY+'%'
				}, durationY, easingType);

				object1PosY = object1PosY - (distanceY);
				$('#object1').stop().animate({
					left: object1PosX+'%',
					top: object1PosY+'%'
				}, durationY, easingType);

				object2PosY = object2PosY - (distanceY/object2DepthDeltaY);
				$('#object2_flirt').stop().animate({
					left: object2PosX+'%',
					top: object2PosY+'%'
				}, durationY, easingType);

			  break;
			default:
				null;
		};

	};


	$('#btn_arrow_left').mousedown(function(){
		move('left');
	});
	$('#btn_arrow_right').mousedown(function(){
		move('right');
	});

	$(document).keydown(function(event) {
		if (!zoomed) {
			switch(event.which) {
				case 37:
					move('left');
					break;
				case 39:
					move('right');
					break;
				default:
					null;
			};
		};
	});

	$('.flirt').click(function(event){
		activeGirlNumber = $(this).attr('id').substring(6,7);
		console.log(activeGirlNumber);
		if (activeGirlNumber!=2) return;
		$('.btn_arrow').fadeOut(1500);

		// Zoom in on girl
		$('#object'+activeGirlNumber+'_flirt').transition({ scale: 1.7, x: 0, y: '+28%', duration: 3000 }, 3000, easingType, function(){
			$('#object'+activeGirlNumber+'_flirt video').seeThru('pause');
			$('#object'+activeGirlNumber+'_flirt').fadeOut();
			$('#object'+activeGirlNumber+'_question').fadeIn();
			$('#video'+activeGirlNumber+'_question').seeThru('play');
			$('#object'+activeGirlNumber+'_more').delay(5000).fadeIn(1500);
		});
		$('#wrapper').stop().animate({
			'backgroundSize': '180%'
		}, 3000, easingType);

		zoomed = !zoomed;
		event.stopPropagation();
	});

	$('.more li').click(function(event){
		var index = $("li").index(this);
		if (index==0){
			// Play How To video
			$('#object'+activeGirlNumber+'_more').fadeOut(1500);
			$('#object'+activeGirlNumber+'_question').hide();
			$('#object'+activeGirlNumber+'_yes').show();
			$('#video'+activeGirlNumber+'_yes').seeThru('play');
			$('#object'+activeGirlNumber+'_yes').delay(1000).animate({
				left: '-=170'
			}, 1000, function() {
				$('#object'+activeGirlNumber+'_cta').fadeIn(1000);
			});

		} else {
			// Return to party
			$('.more').fadeOut(1500);
			$('.btn_arrow').fadeIn(1500);

			// Zoom out from girl
			$('#object'+activeGirlNumber+'_question').fadeOut();
			$('#object'+activeGirlNumber+'_flirt').fadeIn().transition({ scale: girl[activeGirlNumber-1].objectWidth, x: girl[activeGirlNumber-1].objectPosX, y: girl[activeGirlNumber-1].objectPosY, duration: 2500 }, 2500, easingType);
			$('#object'+activeGirlNumber+'_flirt video').seeThru('play');
			$('#wrapper').stop().animate({
				'backgroundSize': '129%'
			}, 3000, easingType);

			zoomed = !zoomed;			
		};
	});

	$('.return').click(function(event){
			// Return to party
			$('.cta').fadeOut(500);
			$('.btn_arrow').fadeIn(1500);

			// Zoom out from girl
			$('#object'+activeGirlNumber+'_yes').fadeOut();
			$('#object'+activeGirlNumber+'_flirt').fadeIn().transition({ scale: girl[activeGirlNumber-1].objectWidth, x: girl[activeGirlNumber-1].objectPosX, y: girl[activeGirlNumber-1].objectPosY, duration: 2500 }, 2500, easingType);
			$('#object'+activeGirlNumber+'_flirt video').seeThru('play');
			$('#wrapper').stop().animate({
				'backgroundSize': '129%'
			}, 3000, easingType);

			zoomed = !zoomed;			
	});

	// Fade in pool background and foreground girls
	for (var i=0;i<3;i++) {
		$('#object'+(i+1)+'_flirt').css('left',girl[i].objectPosX+'%').css('top',girl[i].objectPosY+'%').transition({ scale: girl[i].objectWidth }).fadeIn(1500);
	};
	// $('#object2_flirt').css('left',girl[1].objectPosX+'%').css('top',girl[1].objectPosY+'%').css({ scale: girl[1].objectWidth }).fadeIn(1500);

	$('#wrapper').css({'backgroundSize': '129%'}).css('background-position',currentPosX+'% '+currentPosY+'%').fadeIn(1500);

	$('.flirt video').seeThru({		
		start : 'autoplay',
		end : 'rewind'
	}).seeThru('play');

	$('.question').css({
		scale: 0.6		
	});
	$('.yes').css({
		scale: 0.6		
	});

	$('.question video').seeThru({		
		start : 'external',
		end : 'stop'
	});
	$('.yes video').seeThru({		
		start : 'external',
		end : 'stop'
	});

});
