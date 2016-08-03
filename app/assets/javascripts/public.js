//= require twitter.bootstrap.2.0.4/bootstrap/transition.js
//= require twitter.bootstrap.2.0.4/bootstrap/alert.js
//= require twitter.bootstrap.2.0.4/bootstrap/button.js
//= require twitter.bootstrap.2.0.4/bootstrap/collapse.js
//= require twitter.bootstrap.2.0.4/bootstrap/dropdown.js
//= require gko/gko.galleria

//= require photoswipe/klass.min.js
//= require photoswipe/code.photoswipe.jquery-3.0.5.js


(function(window, $, PhotoSwipe){
	
	$(document).ready(function(){
		if ($(".photoswipe").length > 0) {
			var options = {};
			$(".photoswipe a").photoSwipe(options);
		}
	});
	
	
}(window, window.jQuery, window.Code.PhotoSwipe));

$(document).ready(function() {

		rescale = function(e) {
			//simply set the active page's minimum height to screen height, depending on orientation 
			var orientation 	= window.orientation,
				port			= orientation === "portrait",
				winMin			= port ? 480 : 320,
				screenHeight	= port ? screen.availHeight : screen.availWidth,
				winHeight		= Math.max( winMin, $( window ).height() ),
				pageMin			= Math.min( screenHeight, winHeight ),
				body =  $("body"),
				container =  $("#wrapper-wide-body"),
				bodyHeight =  $("header").outerHeight() + $("footer").outerHeight() + available_size.h;
				
				if(pageMin > bodyHeight) {  
						container.css({"padding-top": Math.abs((bodyHeight-pageMin)/2)});
			    }
			else {
				container.css({"padding-top": 0});
			}
		}
    /////////////////////////////////////////////////
    init = function() {

	 	if(typeof(data) != 'undefined') {
		
			Galleria.addTheme({
			    name: 'classic',
			    author: 'Jouf Design',
			    defaults: {
			        transition: 'slide',
			        thumbCrop:  'height'
			    },
			    init: function(options) {

			        // add some elements
			        this.addElement('info-link','info-close', "thumbnails-tab", "controls-container", "controls-play");
			        this.append({
			            'info' : ['info-link','info-close'],
									container: ["controls-container", "thumbnails-tab"],
			            "controls-container": ["controls-play"]
			        });


			        // cache some stuff
			        var info = this.$('info-link,info-close,info-text'),
									stage = this.$('stage'),
			            playbtn = this.$('controls-play'),
									tab = this.$('thumbnails-tab'),
			            thumbs = this.$('thumbnails-container'),
									thumbsHover = this.$('thumbnails-hover'),
									touch = Galleria.TOUCH,
									THUMBS_OPEN = true, 
			            click = touch ? 'touchstart' : 'click',
									display_thumbs = function(show) {
										if(show) {
											thumbs.css('opacity', 100);
										} else {
											thumbs.css('opacity', 0);
										}
										THUMBS_OPEN = show;
			            }
			        // show loader & counter with opacity
			        //this.$('loader,counter').show().css('opacity', 0.4);
			         display_thumbs(false);
			        // some stuff for non-touch browsers
			        if (! touch ) {
			           // this.addIdleState( this.get('image-nav-left'), { left:-50 });
			           // this.addIdleState( this.get('image-nav-right'), { right:-50 });
								this.addIdleState( this.get('counter'), { opacity:1 });
			 					this.bind(Galleria.IDLE_ENTER, function(e) { 
				           //display_thumbs(false);
								});
								this.bind(Galleria.IDLE_EXIT, function(e) {
				           //display_thumbs(true);
								});
			        }

							if ( options.autoplay === true ) {
								playbtn
			          .removeClass("player-ui-icon-play")
			          .addClass("player-ui-icon-pause");
							}
			        // toggle info
			        if ( options._toggleInfo === true ) {
			           // info.bind( click, function() {
			           //     info.toggle();
			           // });
			        } else {
			           // info.show();
			           // this.$('info-link, info-close').hide();
			        }
							this.bind(Galleria.IMAGE, function(e) {
								//log('image ' + e.index + ' ' + e.cached);
							});

			        // bind some stuff
			        this.bind(Galleria.THUMBNAIL, function(e) {
			            if (! touch ) {
			                // fade thumbnails
			                $(e.thumbTarget).css('opacity', 0.6).parent().hover(function() {
			                    $(this).not('.active').children().stop().fadeTo(100, 1);
			                }, function() {
			                    $(this).not('.active').children().stop().fadeTo(400, 0.6);
			                });

			                if ( e.index === this.getIndex() ) {
			                    $(e.thumbTarget).css('opacity',1);
			                }
			            } else {
			                $(e.thumbTarget).css('opacity', this.getIndex() ? 1 : 0.6);
			            }
			        });   
							thumbs.bind('mouseover', this.proxy(function() {
			            display_thumbs(true); 
			        }));
							thumbs.bind('mouseout', this.proxy(function() {
								display_thumbs(false); 
							})); 


			        tab.bind(options.thumbEventType, this.proxy(function() {
			            tab.toggleClass('open', !THUMBS_OPEN);
			            display_thumbs(!THUMBS_OPEN); 
			        }));
			        playbtn.bind(click, this.proxy(function() {
			            if (this._playing) { 
			                this.pause();
			            } else {
											this.next();
			                this.play();
			            }
			        }));
			        // Binds play/pause events
			        this.bind(Galleria.PAUSE,
			        function(e) {
			            playbtn
			            .removeClass("player-ui-icon-pause")
			            .addClass("player-ui-icon-play");
			            });
			        this.bind(Galleria.PLAY,
			        function(e) {
			            playbtn
			            .removeClass("player-ui-icon-play")
			            .addClass("player-ui-icon-pause");
			            });
			        this.bind(Galleria.LOADSTART, function(e) {
			            if (!e.cached) {
			                this.$('loader').show().fadeTo(200, 0.4);
			            }
			            $(e.thumbTarget).css('opacity',1).parent().siblings().children().css('opacity', 0.6);
			        });
			        this.bind(Galleria.LOADFINISH, function(e) {
									this.$('loader').fadeOut(200);
			        });
							this.bind(Galleria.FULLSCREEN_ENTER, function(e) {
									$("#wrapper-wide-header").css('visibility', 'hidden');
									$("#wrapper-wide-footer").css('visibility', 'hidden');
									$("body").css('backgroundColor', '#000000');
			        });
							this.bind(Galleria.FULLSCREEN_EXIT, function(e) {
								Utils.forceStyles(self.get('container'), {
			              position: 'relative'
			          });
									$("#wrapper-wide-header").css('visibility', 'visible');
									$("#wrapper-wide-footer").css('visibility', 'visible');
									$("body").css('backgroundColor', '#ffffff');
			        });
			    }
			});
			
			Galleria.run('.galleria', {
				width: available_size.w,
				height: available_size.h,
				imageTimeout: 40000,
				autoplay:false,
				debug:false,
				preload:4,
				queue:true,
				showInfo:false,
				showCounter:true,
				useCanvas:false,
				fullscreenDoubleTap:false,
				idleTime: 1000,
				dataSource: data
	        });
		};

	    // Move title and description only if description is present
	    if ($('body').attr('id') == 'album') {
			 // $("h1.page-title:first").hide();
				$(".description.albums:first").hide();
				$(".next-previous").hide();
	    } 
			$('#primary-menu ul.nav > li:even a').css("color", "#67CCE6");

			//$('#primary-menu ul').not('.dropdown-menu').each a:even').css("color", "#67CCE6");
			$('#primary-menu ul.dropdown-menu a').css("color", "#67CCE6"); 

      $(".galleria").noContext();
	    // Handle window.resize or orientationchange event
	    $(window).bind("throttledresize",
	    function(e) {
	        rescale(e);
	    });
      rescale();
    }
    //End init
    /////////////////////////////////////////////////
    var gallery,
		thumbs_tab,
		thumbs_open = true,
    available_size = {
        w: 882,
        h: 648
    };
    /////////////////////////////////////////////////
    init();
});