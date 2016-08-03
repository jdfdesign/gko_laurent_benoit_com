/**
 * @preserve Galleria Classic Theme 2011-08-01
 * http://galleria.aino.se
 *
 * Copyright (c) 2011, Aino
 * Licensed under the MIT license.
 */

/*global jQuery, Galleria */

Galleria.requires(1.25, 'This version of Classic theme requires Galleria 1.2.5 or later');

(function($) {

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

}(jQuery));
