// swap hero's content on mobile with minimal delay 
function swapHeroContent() {
	let isCurrentMobile = $(window).width() <= 767

	if (isCurrentMobile && !isSwapped) {
		$('.hero__content--donation').appendTo('.hero--fund .hero__inner')
		$('.hero__content--fund').appendTo('.hero--donation .hero__inner')
		isSwapped = true
	} else if (!isCurrentMobile && isSwapped) {
		$('.hero__content--donation').appendTo('.hero--donation .hero__inner')
		$('.hero__content--fund').appendTo('.hero--fund .hero__inner')
		isSwapped = false
	}
}

let isSwapped = false
swapHeroContent()

jQuery(document).ready(function () {
	// swap hero's content on resize
	let resizeTimeout

	$(window).on('resize load', function () {
		clearTimeout(resizeTimeout)
		resizeTimeout = setTimeout(swapHeroContent, 200)
	})

	$("input[type='tel']").mask('+7 (999) 999-99-99')

	// aside menu toggle
	$('.js-aside-menu-open, .js-aside-menu-close').on(
		'click touchend',
		function (e) {
			e.preventDefault()
			var isOpen = $(this).hasClass('js-aside-menu-open')
			$('.aside-menu').toggleClass('is-open', isOpen)
		}
	)

	// tabs switch
	$('.tabs__content').hide()
	var defaultActive = $('.tabs__item.is-active a').attr('href')
	$(defaultActive).show()

	$('.tabs__item a').on('click touchend', function (e) {
		e.preventDefault()
		$('.tabs__item').removeClass('is-active')
		var related = $(this).attr('href')
		$(this).parent().addClass('is-active')
		if ($(this).parent().hasClass('is-active')) {
			$('.tabs__content').hide()
			$(related).show()
		}
	})

	// requisites toggle
	$('.js-toggle-requisites').on('click touchend', function (e) {
		e.preventDefault()

		var $requisitesItem = $(this).closest('.requisites__item')
		var isActive = $requisitesItem.hasClass('is-active')
		if (isActive) {
			$requisitesItem.removeClass('is-active')
		} else {
			$('.requisites__item').removeClass('is-active')
			$requisitesItem.addClass('is-active')
		}
	})

	// change amount value buttons
	function updateDonationAmount($button, step) {
		var $input = $button.siblings('.donation__form-input')
		var currentValue = parseInt($input.val())
		var newValue = currentValue + step

		if (newValue >= 100) {
			$input.val(newValue)
		}
	}
	$('.js-donation-increase').on('click touchend', function () {
		updateDonationAmount($(this), 50)
	})
	$('.js-donation-decrease').on('click touchend', function () {
		updateDonationAmount($(this), -50)
	})

	// change select value buttons
	function updateDropdownSelection($button, direction) {
		var $select = $button.siblings('.donation__form-dropdown')
		var currentIndex = $select.prop('selectedIndex')
		var newIndex = currentIndex + direction

		if (newIndex >= 0 && newIndex < $select.find('option').length) {
			$select.prop('selectedIndex', newIndex)
		}
	}

	$('.js-donation-next').on('click touchend', function () {
		updateDropdownSelection($(this), 1)
	})
	$('.js-donation-prev').on('click touchend', function () {
		updateDropdownSelection($(this), -1)
	})

	// change variation value
	$('.js-donation-variation').on('click touchend', function () {
		var value = $(this).data('value')
		var $parentCol = $(this).closest('.donation__form-col--variation')

		$parentCol.find('#donation-variation').val(value)
		$parentCol.find('.donation__form-scrollable-item').removeClass('is-active')

		$(this).addClass('is-active')
	})
})

var projectSwiper = new Swiper('.projects__swiper', {
	slidesPerView: 1,
	spaceBetween: 50,
	effect: 'fade',
	keyboard: {
		enabled: true,
	},
	navigation: {
		prevEl: '.projects__swiper-prev',
		nextEl: '.projects__swiper-next',
	},
})

const slideCount = 7

for (let i = 1; i <= slideCount; i++) {
	$(`#project-${i}`).click(projectSwiper, function () {
		projectSwiper.slideTo(i - 1)
	})
}

$(document).ready(function () {
	$('.projects__item-inner').on('click touchend', function () {
		$('.projects__swiper-wrapper').removeClass('is-hidden')
		$('.projects__wrapper').addClass('is-hidden')
	})
})
$(document).ready(function () {
	$('.projects__card-close-button').on('click touchend', function () {
		$('.projects__swiper-wrapper').addClass('is-hidden')
		$('.projects__wrapper').removeClass('is-hidden')
	})
})

new Swiper('.animals__tabs', {
	slidesPerView: 'auto',
	spaceBetween: 10,
	mousewheel: true,
	freeMode: true,
	scrollbar: {
		el: '.swiper-scrollbar',
	},
})

new Swiper('.animals__swiper', {
	spaceBetween: 0,
	breakpoints: {
		320: {
			centeredSlides: true,
			slidesPerView: 1,
		},
		540: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
		},
		1240: {
			slidesPerView: 4,
		},
		1920: {
			slidesPerView: 5,
		},
	},
})

new Swiper('.partners__swiper', {
	grid: {
		fill: 'row',
		rows: 2,
	},
	spaceBetween: 15,
	breakpoints: {
		320: {
			slidesPerView: 1,
			centeredSlides: true,
			grid: {
				fill: 'row',
				rows: 1,
			},
		},
		540: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
		1024: {
			slidesPerView: 4,
		},
		1440: {
			slidesPerView: 5,
		},
	},
	navigation: {
		prevEl: '.partners__swiper-prev',
		nextEl: '.partners__swiper-next',
	},
})

new Swiper('.news__swiper', {
	spaceBetween: 0,
	breakpoints: {
		320: {
			centeredSlides: true,
			slidesPerView: 1,
		},
		540: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
		},
		1240: {
			slidesPerView: 4,
		},
	},
})

new Swiper('.histories__swiper', {
	spaceBetween: 0,

	breakpoints: {
		320: {
			centeredSlides: true,
			slidesPerView: 1,
		},
		540: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
		},
		1240: {
			slidesPerView: 4,
		},
		1920: {
			slidesPerView: 5,
		},
	},
})

new Swiper('.team__swiper', {
	spaceBetween: 30,

	breakpoints: {
		320: {
			centeredSlides: true,
			slidesPerView: 1,
		},
		540: {
			slidesPerView: 2,
		},
		1024: {
			slidesPerView: 3,
		},
		1240: {
			slidesPerView: 4,
		},
	},
	navigation: {
		prevEl: '.team__swiper-prev',
		nextEl: '.team__swiper-next',
	},
})

new Swiper('.help-now__tabs', {
	slidesPerView: 'auto',
	spaceBetween: 10,
	mousewheel: true,
	freeMode: true,
	scrollbar: {
		el: '.swiper-scrollbar',
	},
})

new Swiper('.projects-tile__tabs', {
	slidesPerView: 'auto',
	spaceBetween: 10,
	mousewheel: true,
	freeMode: true,
	scrollbar: {
		el: '.swiper-scrollbar',
	},
})

new Swiper('.animal__tabs', {
	slidesPerView: 'auto',
	spaceBetween: 30,
	mousewheel: true,
	freeMode: true,
	scrollbar: {
		el: '.swiper-scrollbar',
	},
})

new Swiper('.animal__swiper', {
	slidesPerView: 2,
	spaceBetween: 10,
	watchSlidesProgress: true,
	breakpoints: {
		375: {
			slidesPerView: 3,
		},
	},
	navigation: {
		prevEl: '.animal__swiper-prev',
		nextEl: '.animal__swiper-next',
	},
})

new Swiper('.animal__swiper-preview', {
	grabCursor: true,
	slidesPerView: 1,
	spaceBetween: 30,
	thumbs: { swiper: `.animal__swiper` },
	on: {
		// function to stop youtube video on slidechange
		slideChange: function (el) {
			$('.swiper-slide').each(function () {
				var youtubePlayer = $(this).find('iframe').get(0)
				if (youtubePlayer) {
					youtubePlayer.contentWindow.postMessage(
						'{"event":"command","func":"pauseVideo","args":""}',
						'*'
					)
				}
			})
		},
		// function to stop <video> on slidechange
		slideChange: function (el) {
			$('.swiper-slide').each(function () {
				var video = $(this).find('video').get(0)
				if (video) {
					video.pause()
				}
			})
		},
	},
})
