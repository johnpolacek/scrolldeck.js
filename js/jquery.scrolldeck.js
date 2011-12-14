/*
	scrollpresentation - jQuery plugin to create a vertically scrolling presentation deck 
	by John Polacek (@johnpolacek)
	
	Originally forked from jquery.pitchdeck by Matt Johnston from DressRush - http://investors.dressrush.com/ 
	
	Dual licensed under MIT and GPL.
*/

(function($) {
    $.scrolldeck = function(options) {
		
		// PRIVATE VARS
		var currIndex,
			buttons,
			slide,
			slides,
			sections,
			i;
		
		var defaults = {
			buttons: '.nav-button',
			slides: '.slide',
			duration: 600,
			easing: 'easeInOutExpo',
			offset: 0
		};
		
		var plugin = this;
		plugin.settings = {};
			
		var init = function() {
			
			$('html, body').animate({ scrollTop: 0 });
			
			plugin.settings = $.extend({}, defaults, options);
			
			buttons = $(plugin.settings.buttons);
			slides = $(plugin.settings.slides);
			currIndex = 0;
			sections = [];
			
			for (i=0; i<buttons.length;i++) {
				var slideIndex = slides.index($($(buttons[i]).attr('href')));
				sections.push(slideIndex);
				console.log(slideIndex);
			}
			
			slides.waypoint(function(e, dir) {
				// get current slide
				currIndex = slides.index(this);
				if (dir == 'up' && currIndex > 1) {
					currIndex --;
				}
				if (currIndex < 0) {
					currIndex = 0;
				}
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
				slide = $($(this).attr('href'));
				currIndex = slide.index();
				scrollToSlide(slide);
			});
			
			// Keyboard events
			$(document).keydown(function(e){
				// left arrow = scroll to prev slide
				if ((e.keyCode == 37) && currIndex !== 0) {
					currIndex--;
					slide = slides.eq(currIndex);
					scrollToSlide(slide);
				}
				// right arrow arrow = scroll to prev slide
				else if ((e.keyCode == 39 || e.keyCode == 32) && currIndex != slides.length-1) { 
					currIndex++;
					slide = slides.eq(currIndex);
					scrollToSlide(slide);
				}
			});
		};
		
		function scrollToSlide(slide) {
			$(window)._scrollable().stop();
			$(window).scrollTo(slide, {
				duration: plugin.settings.duration,
				easing: plugin.settings.easing,
				offset: plugin.settings.offset
			});
		}
		
		
		// INIT
		init();
    };
     
})(jQuery);