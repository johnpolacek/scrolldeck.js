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
			easing: 'easeInOutExpo'
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
				var slideIndex = $($(buttons[i]).attr('href')).index()-1;
				sections.push(slideIndex);
			}
			
			slides.waypoint(function(e, dir) {
				currIndex = slides.index(this);
				if (dir == 'up' && currIndex > 1) {
					currIndex --;
				}
				if (currIndex < 0) currIndex = 0;
				buttons.removeClass('current');
				var currSection = -1;
				for (i=0; i<sections.length;i++) {
					if (currIndex >= sections[i]) {
						currSection = i;
					}
				}	
				buttons.eq(currSection).addClass('current');
			});
			
			// Nav button click event
			buttons.click(function(e) {
				e.preventDefault();
				slide = $($(this).attr('href'));
				currIndex = slide.index();
				$(window)._scrollable().stop();
				$.scrollTo(slide, {
					duration: plugin.settings.duration,
					easing: plugin.settings.easing
				});
			});
			
			// Keyboard events
			$(document).keydown(function(e){
				if ((e.keyCode == 37) && currIndex !== 0) {
					currIndex--;
					slide = slides.eq(currIndex);
					$(window)._scrollable().stop();
					$(window).scrollTo(slide, {
						duration: plugin.settings.duration,
						easing: plugin.settings.easing
					});
				}
				else if ((e.keyCode == 39 || e.keyCode == 32) && currIndex != slides.length-1) { 
					currIndex++;
					slide = slides.eq(currIndex);
					$(window)._scrollable().stop();
					$(window).scrollTo(slide, {
						duration: plugin.settings.duration,
						easing: plugin.settings.easing
					});
				}
			});
		};
		
		
		// INIT
		init();
    };
     
})(jQuery);