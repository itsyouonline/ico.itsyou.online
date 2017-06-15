$(document).ready(function() {


	// Bounties graph
	if($('.bounties__graph').length) {

		var start = 0,
            windowWidth = $('window').width(),
            color;
            // size = 67,
            // thickness;

            $('.bounties__graph li').each(function(i){
			var $this = $(this);
			var graph = $this.find('.graph');
			var value = graph.attr('data-value');


			start += parseFloat(value) * 10;

			if ($(this).hasClass('green-item')) {
                color = '#a4be39'
            } else {
                color = '#0C9DD9'
            }
            // if ( 767 > windowWidth <= 992  ){
            //     size = 55;
            //     thickness = 4
            // }
            // if (windowWidth < 768  ){
            //     size = 40
            // }
            //
            // $('window').resize(function () {
            //     if ( 767 > windowWidth < 993  ){
            //         size = 55
            //     }
            //     if (windowWidth < 768  ){
            //         size = 40
            //     }
            // });



			graph.circleProgress({
				startAngle: start,
				value: value,
				size: 67,
				thickness: 6,
				//lineCap: 'round',
				emptyFill: '#EBF1F9',
				fill: {
					color: color
				}
			});
		});
        $('.bounties__graph li.green-item').each(function(i){
            color = '#a4be39'
        });
	}


	$('.rmap__col').click(function(){
		$('.rmap__col').removeClass('rmap__col--active');
		$(this).addClass('rmap__col--active');
	});

	if($('.structure_box__graph').length) {
		$('.structure_box__graph-in .structure_box__pr').each(function(){
			var prc = $(this).attr('data-prc');
			$(this).css({'width': prc + '%'});
		});
	}

	function get_timer(string) {
     var date_new = string;
     var date_t = new Date(date_new);
     var date = new Date();
     var timer = date_t - date;

     if (date_t > date) {
         var day = parseInt(timer/(60*60*1000*24));
         var hour = parseInt(timer/(60*60*1000))%24;
         var min = parseInt(timer/(1000*60))%60;
         var sec = parseInt(timer/1000)%60;
         
         if(day < 10) {
             day = '0' + day;
         }

         day = day.toString();

         if(hour < 10) {hour = '0' + hour;}
         
         hour = hour.toString();

         if(min < 10) {min = '0' + min;}
         
         min = min.toString();

         if(sec < 10) {sec = '0' + sec;}
         
         sec = sec.toString();


         function declOfNum(number, titles)  {
             cases = [2, 0, 1, 1, 1, 2];
             return titles[ (number%100>4 && number%100<20)? 2 : cases[Math.min(number%10, 5)] ];
         }

         var d_txt = declOfNum(day, ['Day', 'Days', 'Days']);
         var h_txt = declOfNum(hour, ['Hour', 'Hours', 'Hours']);
         var m_txt = declOfNum(min, ['Minute', 'Minutes', 'Minutes']);
         var s_txt = declOfNum(sec, ['Second', 'Seconds', 'Seconds']);


         $('.b_timer__d').text(day);
         $('.b_timer__d-txt').text(d_txt);

         $('.b_timer__h').text(hour);
         $('.b_timer__h-txt').text(h_txt);

         $('.b_timer__m').text(min);
         $('.b_timer__m-txt').text(m_txt);

         $('.b_timer__s').text(sec);
         $('.b_timer__s-txt').text(s_txt);
     } else {
//         $('.b_timer__d').text(0);
//         $('.b_timer__h').text(0);
//         $('.b_timer__m').text(0);
//         $('.b_timer__s').text(0);
     }
	}

    function b_timer() {
        var string = '06/21/2017 12:00 UTC';

        get_timer(string);

        setInterval(function() {
            get_timer(string);
        }, 1000);
    }

    if($('.timer__items').length) {
        b_timer();
    }


	function usr_slider() {

		if($(window).width() <= 767) {

			$usr_box__list = $('.usr_box__list .row');

			$usr_box__list.on('initialized.owl.carousel translated.owl.carousel resize.owl.carousel loaded.owl.lazy', function(e){
				var img_h = $('.usr_box__item').find('.thumb').width();

				$('.usr_box .owl-prev, .usr_box .owl-next').css({top: img_h/2 });
				$('.usr_box__list-info').css({top: img_h + 20 });

				$(this).parent().find('.usr_box__list-info').text(e.item.index+1 + ' / ' + e.item.count)
		    });

		    $usr_box__list.on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (event) {
				if (!event.namespace) return;
				var carousel = event.relatedTarget,
				element = event.target,
				current = carousel.current();
				$('.owl-next', element).toggleClass('disabled', current === carousel.maximum());
				$('.owl-prev', element).toggleClass('disabled', current === carousel.minimum());
			})

			$usr_box__list.owlCarousel({
				items: 1,
				nav: true,
				dots: false,
				lazyLoad: true,
			});
		} else {
			$('.usr_box__list .row').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');

			$('.usr_box__item .thumb img').each(function() {
				$(this).attr('src', $(this).attr('data-src'));
	        });
		}
	}

	if($('.usr_box__list').length) {
		usr_slider();

		$(window).resize(function(){
			usr_slider();
		});
	}


	// Tooltip
	if($('.tooltipster').length) {
		 $('.tooltipster').tooltipster({
		 	theme: 'tooltipster-shadow',
		 });
	}

	// Page scroll
	$('.top__nav, .mobile__nav').onePageNav({
		currentClass: 'active',
		scrollOffset: 107,
		changeHash: true,

		begin: function() {
	        $('body').append('<div id="device-dummy" style="height: 1px;"></div>');
	    },
	    end: function() {
	        $('#device-dummy').remove();
	    }
	});

	function top() {
		var top_item = $('.top');
		var win_scroll = $(window).scrollTop();

		if(win_scroll > 0) {
			top_item.removeClass('top--visible');
			top_item.stop(true).addClass('top--white top--fixed')
		} else {
			top_item.removeClass('top--white top--fixed');
			top_item.addClass('top--visible');
		}
	}

	top();

	$(window).scroll(function(){
		top();
	});


	// Mobile menu btn
	$('.btn-sandwich').click(function(){
        $(this).toggleClass('btn-sandwich--active');
    });

    $('#mobile_menu').on('show.bs.modal', function (e) {
        setTimeout(function(){
            $('body').addClass('mobile_menu--opened');
        });
    });

    $('#mobile_menu').on('hide.bs.modal', function (e) {
        setTimeout(function(){
            $('body').removeClass('mobile_menu--opened');
            $('.btn-sandwich').removeClass('btn-sandwich--active');
        }, 250);
    });


    if($('.details_box').length) {
		$('.details_box dt').click(function(){
			$(this).parent().toggleClass('active');
			$(this).parent().find('dd').slideToggle(250);
		});
    }


    // Mobile acc box
    $('.mar_box_acc__title').click(function(){
    	$(this).parent().toggleClass('mar_box_acc__item--active');
    	$(this).parent().find('.mar_box_acc__body').slideToggle(250);
    });


	// Subscribe toggle class
	$('.footer__subscribe .inp-style').focus(function(){
		$(this).parent().addClass('inp-group--active');
	});

	$('.footer__subscribe .inp-style').blur(function(){
		$(this).parent().removeClass('inp-group--active');
	});


	$('.modal_info').on('show.bs.modal', function (e) {
       $('body').addClass('bg-modal_info');
    });

    $('.modal_info').on('hide.bs.modal', function (e) {
       $('body').removeClass('bg-modal_info');
    });


	$('#coop-carousel').owlCarousel({
		center: true,
		loop: true,
		dots: true,
		autoplay: true,
		dots: true
	});

	// not jQuery .click because of weird jquery.nav behavior
	// which causes first click on elem to fail
	document.getElementById('mobile_menu__lang_select')
		.addEventListener('click', function () {
			var $selector = $('#mobile_menu__lang_select');
			var $options = $('#mobile_menu__lang_options');
			console.log('here');
			if ($selector.hasClass('disabled')) {
				console.log('removed');
				$selector.removeClass('disabled');
				$options.removeClass('disabled');
			} else {
				$selector.addClass('disabled');
				$options.addClass('disabled');
			}
		});

        // lang menu
    $('body').click(function(event){
        var $tgt = $(event.target);
        if(!($tgt.is('a.lang__link'))){
            $('.lang').removeClass('lang--open')
        }
    });
    $('ul.lang').click(function () {
        $('.lang').toggleClass('lang--open');
    });
    $('ul.lang').hover(
       function(){ $(this).addClass('lang--open') },
       function(){ $(this).removeClass('lang--open') }
)
    $('.lang__link').click(function () {
        $('.lang__link').removeClass('lang__link--checked');
        $(this).addClass('lang__link--checked');
    });

    function prettyNumber(number) {
    	var snumber = ('' + number).split('').reverse().join('');
    	var chunks = [];
    	var chunksSize = 3;
        for (var i = 0, charsLength = snumber.length; i < charsLength; i += chunksSize) {
            chunks.push(snumber.substring(i, i + chunksSize).split('').reverse().join(''));
        }
        return chunks.reverse().join(',')
	}

	var fetchSuccess = false;

    function updateInvestments() {
        var url = 'https://naidisebe.com/polybius/proxy/';
        $.get(url, function (body) {
        	fetchSuccess = true;
        	var data = JSON.parse(body)
			var totalUsd = data.total_usd,
				totalBtc = data.total_btc;
            $('.already_invested .amount_btc').text((+totalBtc).toFixed(6));
			$('.already_invested .amount_usd').text(
				prettyNumber((+totalUsd).toFixed(0))
			);
			var MILLION = 1000000
			var milestones = $('.rmap__col')
            milestones.removeClass('rmap__col--active')
			if (totalUsd < 3 * MILLION) {
				milestones[0].classList.add('rmap__col--active')
			} else if (totalUsd < 6 * MILLION) {
				milestones[1].classList.add('rmap__col--active')
			} else if (totalUsd < 10 * MILLION) {
				milestones[2].classList.add('rmap__col--active')
			} else if (totalUsd < 25 * MILLION) {
				milestones[3].classList.add('rmap__col--active')
			} else {
				milestones[4].classList.add('rmap__col--active')
			}

		})
        .fail(function () {
            if (!fetchSuccess) {
                $('.already_invested .amount_btc').text('1075.84563671')
                $('.already_invested .amount_usd').text('2,643,697');
            }
		})

    }

    updateInvestments();
    setInterval(updateInvestments, 10 * 1000);
});



