/*
	scrollpresentation - jQuery plugin to create a vertically scrolling presentation deck 
	by John Polacek (@johnpolacek)
	
	Based on jquery.scrollpresentation by Matt Johnston from DressRush - http://investors.dressrush.com/ 
	
	Dual licensed under MIT and GPL.
*/

(function($){
    $.fn.extend({ 
        
		scrolldeck: function(options) {
            
			var defaults = {
            	buttons: '.nav-button',
                slides: '.slide',
                duration: 600,
                easing: 'easeInOutExpo'
            }
			var currSlide = 0;
            var o =  $.extend(defaults, options);
            return this.each(function() {
                var slide = $(o.slides).eq(0);
				
				// Update 'current' nav button
				$(o.slides).waypoint(function(e, dir) {
					if (dir == 'up' && $(this).attr('id') != 'slide1') slide = $(this).prev();
					else slide = $(this);
					$(o.buttons).removeClass('current');
					$(o.buttons+'[href=#'+slide.attr('id')+']').addClass('current');
				});
				
				$(o.buttons).click(function() {
					slide = $($(this).attr('href'));
					$(window)._scrollable().stop();
					$.scrollTo(slide, {
						duration: o.duration,
						easing: o.easing
					});
					return false;
				});
				
				// Set up keyboard control
				$(document).keydown(function(e){
					if ((e.keyCode == 37) && slide.attr('id') != 'slide1') { 
						slide = slide.prev();
						console.log(slide);
						$(window)._scrollable().stop();
						$(window).scrollTo(slide, {
							duration: o.duration,
							easing: o.easing
						});
					}
					else if ((e.keyCode == 39 || e.keyCode == 32) && slide.attr('id') != 'slide11') { 
						slide = slide.next();
						console.log(slide);
						$(window)._scrollable().stop();
						$(window).scrollTo(slide, {
							duration: o.duration,
							easing: o.easing
						});
					}
				});
            });
        }
    });
     
})(jQuery);