/*
	scrolldeck - jQuery scrolldeck to create a vertically scrolling presentation deck 
	by John Polacek (@johnpolacek)
	
	Dual licensed under MIT and GPL.
*/

(function($) {
    $.scrolldeck = function(options) {
		
		// PRIVATE VARS
		var currIndex,
			buttons,
			slides,
			sections,
			controller,
			i;
		
		var defaults = {
			buttons: '.nav-button',
			slides: '.slide',
			duration: 600,
			easing: 'easeInOutExpo',
			offset: 0
		};
		
		var scrolldeck = this;
		scrolldeck.settings = {};
			
		var init = function() {
			
			$('html, body').animate({ scrollTop: 0 });
			
			scrolldeck.settings = $.extend({}, defaults, options);
			
			buttons = $(scrolldeck.settings.buttons);
			slides = $(scrolldeck.settings.slides);
			currIndex = 0;
			sections = [];
			controller = $.scrollorama({blocks:slides});
			
			for (i=0; i<buttons.length;i++) {
				var slideIndex = slides.index($($(buttons[i]).attr('href')));
				sections.push(slideIndex);
			}
			
			controller.onBlockChange(function() {
				// get slide index
				currIndex = controller.blockIndex;
				console.log('scrollorama index '+currIndex);
				
				// update nav
				if (buttons) {
					buttons.removeClass('current');
					var currSection = -1;
					for (i=0; i<sections.length;i++) {
						if (currIndex >= sections[i]) {
							currSection = i;
						}
					}
					if (currSection != -1) {
						buttons.eq(currSection).addClass('current');	
					}
				}
			});
			
			// Nav button click event
			buttons.click(function(e) {
				e.preventDefault();
				var slide = $($(this).attr('href'));
				currIndex = slide.index();
				scrollToSlide(slide);
			});
			
			// Keyboard events
			$(document).keydown(function(e){
				// left arrow = scroll up
				if ((e.keyCode == 37) && currIndex !== 0) {
					currIndex--;
					scrollToSlide(slides.eq(currIndex));
				}
				// right arrow = scroll down
				else if ((e.keyCode == 39 || e.keyCode == 32) && currIndex != slides.length-1) { 
					currIndex++;
					scrollToSlide(slides.eq(currIndex));
				}
			});
		};
		
		function scrollToSlide(slide) {
			console.log('offset '+scrolldeck.settings.offset);
			$(window)._scrollable().stop();
			$(window).scrollTo(slide, {
				duration: scrolldeck.settings.duration,
				easing: scrolldeck.settings.easing,
				offset: scrolldeck.settings.offset
			});
		}
		
		
		// INIT
		init();
    };
     
})(jQuery);