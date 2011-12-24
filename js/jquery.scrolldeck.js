/*
	scrolldeck - jQuery scrolldeck to create a vertically scrolling presentation deck 
	by John Polacek (@johnpolacek)
	
	Dual licensed under MIT and GPL.
*/

(function($) {
    $.scrolldeck = function(options) {
		
		
		// VARS
		
		var currIndex = 0,
			buttons,
			slides,
			scrollpoints = [],
			sections = [],
			controller,
			i;
		
		var defaults = {
			buttons: '.nav-button',
			slides: '.slide',
			duration: 600,
			easing: 'easeInOutExpo',
			offset: 0
		};
		
		
		// INIT
		
		var scrolldeck = this;
		scrolldeck.settings = {};
			
		var init = function() {
			
			$('html, body').animate({ scrollTop: 0 });
			
			scrolldeck.settings = $.extend({}, defaults, options);
			
			buttons = $(scrolldeck.settings.buttons);
			slides = $(scrolldeck.settings.slides);
			controller = $.scrollorama({blocks:slides, offset:scrolldeck.settings.offset});
			
			// set slide and animation scrollpoints
			for (i=0; i<slides.length; i++)  		scrollpoints.push(slides.eq(i).offset().top);
			for (i=0; i<$('.animate').length; i++)	scrollpoints.push($('.animate').eq(i).offset().top);
			scrollpoints.sort(function(a,b){return a - b});
			
			// if nav buttons, create array of section header slide indexes
			for (i=0; i<buttons.length;i++) 		sections.push(slides.index($($(buttons[i]).attr('href'))));
			
			// event handler for updating current slide index and current nav button
			controller.onBlockChange(function() {
				// get slide index
				currIndex = controller.blockIndex;
				
				// then update nav
				updateNav();
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
					scrollToSlide(getPrevScrollpoint());
				}
				// right arrow = scroll down
				else if ((e.keyCode == 39 || e.keyCode == 32) && currIndex != slides.length-1) { 
					scrollToSlide(getNextScrollpoint());
				}
			});
			
			// if slides are images, assign height to auto for proportional scaling
			for (i=0; i<slides.length; i++) {
				var el = slides.eq(i);
				if (el.prop('tagName').toUpperCase() === 'IMG') {
					el.css('height','auto');	
				}
			}
			
			// if last slide is shorter than height of window, increase height
			var lastSlide = slides.eq(slides.length-1);
			if (lastSlide.height() < $(window).height()) {
				lastSlide.css('height', $(window).height());
			}
			
			updateNav();
		};
		
		
		
		// PRIVATE FUNCTIONS
		
		function updateNav() {
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
		}
		
		function scrollToSlide(slide) {
			$(window)._scrollable().stop();
			$(window).scrollTo(slide, {
				duration: scrolldeck.settings.duration,
				easing: scrolldeck.settings.easing,
				offset: scrolldeck.settings.offset
			});
		}
		
		function getNextScrollpoint() {
			return getScrollpoint(2);
		}
		
		function getPrevScrollpoint() {
			return getScrollpoint(-1);
		}
		
		function getScrollpoint(n) {
			var scrollTop = $(window).scrollTop();
			var points = scrollpoints.slice(0);
			points.push(scrollTop);
			points.sort(function(a,b){return a - b});
			return points[points.indexOf(scrollTop)+n]
		}
		
		
		// INIT
		init();
    };
     
})(jQuery);