function init () {
	var myMap = new ymaps.Map("map", {
					center: [58.016705, 56.278363],
					zoom: 16
			}, {
					searchControlProvider: 'yandex#search'
			}),
			myPlacemark = new ymaps.Placemark([58.016705, 56.278363], {
					balloonContentHeader: "DART Agency",
					balloonContentBody: "DART <em>Agency</em> метки",
					balloonContentFooter: "Парапапарам",
					hintContent: "Хинт метки"
			});

	myMap.geoObjects.add(myPlacemark);
}
$(document).ready(function() {
	// PRODUCT GALLERY	
	var sync1 = $(".product-gallery .big-gallery");
    var sync2 = $(".product-gallery .small-gallery");
    var slidesPerPage = 3;
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
		margin: 0,
		nav: true,
		dots: false,
		navText: ['<i class="fas fa-chevron-circle-left"></i>', '<i class="fas fa-chevron-circle-right"></i>'],
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			1000: {
				items: 1
			},
			1200: {
				items: 1
			}
		}
    }).on('changed.owl.carousel', syncPosition);

    sync2
        .on('initialized.owl.carousel', function() {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            margin: 0,
			nav: true,
			dots: false,
			navText: ['<i class="fas fa-chevron-circle-left"></i>', '<i class="fas fa-chevron-circle-right"></i>'],
			responsive: {
				0: {
					items: 3
				},
				600: {
					items: 3
				},
				1000: {
					items: 3
				},
				1200: {
					items: 3
				}
			}
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        var current = el.item.index;

        //if you disable loop you have to comment this block
        /*var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }*/

        //end block

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });
	// QUANTITY
	$('.le-quantity button.btn--count').click(function(e){
		e.preventDefault();
		var elem = $(this).parent().find('input.counter');
		var currentQty= elem.val();
		
		if( $(this).hasClass('minus') && currentQty>0){
		  elem.val(parseInt(currentQty, 10) - 1);
		  elem.trigger("change");
		}else{
		  if( $(this).hasClass('plus')){
			elem.val(parseInt(currentQty, 10) + 1);
			elem.trigger("change");
		  }
		}
	});
	if($("#map").length){
		ymaps.ready(init);
	}
	var wow = new WOW({
		mobile:       false
	}).init();
	$('.eqh').matchHeight();
	$("[data-fancybox]").fancybox();
	// MOBILE MENU BUTTON
	$(".navbar-toggler").click(function(e) {
		e.preventDefault();
		$(".navbar-toggler").toggleClass("noactive");
		$('.navigation .navbar-dart ul').toggleClass("active");  
	});
	$(".navigation .parent span").click(function(e) {
		e.preventDefault();
		$(this).parent().toggleClass("active");
	});
	$(function() {
		$(window).scroll(function() {
			if ($(this).scrollTop() != 0) {
				$('#scrollUp').fadeIn();
			} else {
				$('#scrollUp').fadeOut();
			}
		});
		$('#scrollUp').click(function(e) {
			e.preventDefault();
			$('body,html').animate({
				scrollTop: 0
			}, 800);
		});
	});
	// MAIN SLIDER
	$('.main-slider').owlCarousel({
	  loop: true,
	  items: 1,
	  margin: 0,
	  nav: false,
	  autoplay: true,
	  autoplayTimeout: 10000,
	  dots: false,
	  navText: ['<i class="icon icon-left" aria-hidden="true"></i>', '<i class="icon icon-right" aria-hidden="true"></i>'],
	  responsive: {
		0: {
		  items: 1,
		  nav: false
		}
	  }
	});
	// WORKS SLIDER
	$('.works-slider').owlCarousel({
	  loop: true,
	  items: 1,
	  margin: 0,
	  nav: true,
	  autoplay: true,
	  autoplayTimeout: 10000,
	  dots: false,
	  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
	  responsive: {
		0: {
		  items: 1,
		  nav: true
		}
	  }
	});
	// ITEM SLIDERs
	$('.item-slider').owlCarousel({
	  loop: true,
	  items: 1,
	  margin: 0,
	  nav: true,
	  autoplay: false,
	  autoplayTimeout: 10000,
	  dots: false,
	  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
	  responsive: {
		0: {
		  items: 1,
		  nav: true
		}
	  }
	});
	// CLIENTS SLIDER
	$('.clients-slider').owlCarousel({
	  loop: true,
	  items: 6,
	  margin: 30,
	  nav: false,
	  autoplay: true,
	  autoplayTimeout: 3000,
	  dots: true,
	  navText: ['<i class="icon icon-left" aria-hidden="true"></i>', '<i class="icon icon-right" aria-hidden="true"></i>'],
	  responsive: {
		0: {
		  items: 2,
		  nav: false
		},
		0: {
		  items: 3,
		  nav: false
		},
		900: {
		  items: 4,
		  nav: false
		},
		1200: {
		  items: 6,
		  nav: false
		}
	  }
	});
	// RELATED SLIDER
	$('.related-slider').owlCarousel({
	  loop: true,
	  items: 4,
	  margin: 15,
	  nav: false,
	  autoplay: false,
	  autoplayTimeout: 3000,
	  dots: true,
	  navText: ['<i class="icon icon-left" aria-hidden="true"></i>', '<i class="icon icon-right" aria-hidden="true"></i>'],
	  responsive: {
		0: {
		  items: 1,
		  nav: false
		},
		600: {
		  items: 2,
		  nav: false
		},
		900: {
		  items: 4,
		  nav: false
		},
		1200: {
		  items: 4,
		  nav: false
		}
	  }
	});
	// PARTNERS SLIDER
	$('.partner-slider').owlCarousel({
	  loop: true,
	  items: 5,
	  margin: 30,
	  nav: true,
	  dots: false,
	  navText: ['<i class="icon icon-arr-left" aria-hidden="true"></i>', '<i class="icon icon-arr-right" aria-hidden="true"></i>'],
	  responsive: {
		0: {
		  items: 1
		},
		400: {
		  items: 2
		},
		800: {
		  items: 3
		},
		1100: {
		  items: 5
		}
	  }
	});
	$('[data-toggle="tooltip"]').tooltip();
});