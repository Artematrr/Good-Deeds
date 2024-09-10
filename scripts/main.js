jQuery(document).ready(function () {
	// prevent touch on  scrolling
	var isDragging = false
	$('body').on('touchmove', function () {
		isDragging = true
	})
	$('body').on('touchstart', function () {
		isDragging = false
	})

	// prevent double click
	var isCooldown = false

	function setCooldown() {
		isCooldown = true
		setTimeout(function () {
			isCooldown = false
		}, 100)
	}

	// phone mask
	$("input[type='tel']").mask('+7 (999) 999-99-99')

	// aside menu toggle
	$('.js-aside-menu-open, .js-aside-menu-close').on(
		'click touchstart',
		function (e) {
			if (isCooldown) return
			e.preventDefault()
			var isOpen = $(this).hasClass('js-aside-menu-open')
			$('.aside-menu').toggleClass('is-open', isOpen)
			setCooldown()
		}
	)

	// swap hero's content on resize
	let resizeTimeout

	$(window).on('resize', function () {
		clearTimeout(resizeTimeout)
		resizeTimeout = setTimeout(swapHeroContent, 200)
	})

	// tabs switch
	$('.tabs__content').hide()
	var defaultActive = $('.tabs__item.is-active a').attr('href')
	$(defaultActive).show()

	$('.tabs__item a').on('click touchend', function (e) {
		if (isDragging || isCooldown) return
		e.preventDefault()
		$('.tabs__item').removeClass('is-active')
		var related = $(this).attr('href')
		$(this).parent().addClass('is-active')
		if ($(this).parent().hasClass('is-active')) {
			$('.tabs__content').hide()
			$(related).show()
		}
		setCooldown()
	})

	// requisites toggle
	$('.js-toggle-requisites').on('click touchend', function (e) {
		if (isDragging || isCooldown) return

		e.preventDefault()
		var $requisitesItem = $(this).closest('.requisites__item')
		var isActive = $requisitesItem.hasClass('is-active')
		if (isActive) {
			$requisitesItem.removeClass('is-active')
		} else {
			$('.requisites__item').removeClass('is-active')
			$requisitesItem.addClass('is-active')
		}
		setCooldown()
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
		if (isCooldown) return
		updateDonationAmount($(this), 50)
		setCooldown()
	})
	$('.js-donation-decrease').on('click touchend', function () {
		if (isCooldown) return
		updateDonationAmount($(this), -50)
		setCooldown()
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
		if (isCooldown) return
		updateDropdownSelection($(this), 1)
		setCooldown()
	})
	$('.js-donation-prev').on('click touchend', function () {
		if (isCooldown) return
		updateDropdownSelection($(this), -1)
		setCooldown()
	})

	// change variation value
	$('.js-donation-variation').on('click touchend', function () {
		if (isCooldown) return
		var value = $(this).data('value')
		var $parentCol = $(this).closest('.donation__form-col--variation')

		$parentCol.find('#donation-variation').val(value)
		$parentCol.find('.donation__form-scrollable-item').removeClass('is-active')
		$(this).addClass('is-active')
		setCooldown()
	})

	// projects section
	const slideCount = 7

	for (let i = 1; i <= slideCount; i++) {
		$(`#project-${i}`).on('click touchend', function (e) {
			if (isDragging) return
			e.preventDefault()

			projectSwiper.slideTo(i - 1)
			setTimeout(function () {
				document.getElementById(`project-swiper`).scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				})
			}, 50)
		})
	}

	$('.projects__item-inner').on('click touchend', function () {
		if (isDragging) return
		setTimeout(function () {
			$('.projects__swiper-wrapper').removeClass('is-hidden')
			$('.projects__wrapper').addClass('is-hidden')
		}, 10)
	})

	$('.projects__card-close-button').on('click touchend', function () {
		setTimeout(function () {
			$('.projects__swiper-wrapper').addClass('is-hidden')
			$('.projects__wrapper').removeClass('is-hidden')
		}, 10)
	})

	// close projects__swiper and aside menu on ESC
	$(document).on('keydown', function (e) {
		if (e.key === 'Escape') {
			if ($('.aside-menu').hasClass('is-open')) {
				$('.js-aside-menu-close').trigger('click')
			} else {
				$('.projects__swiper-wrapper').addClass('is-hidden')
				$('.projects__wrapper').removeClass('is-hidden')
			}
		}
	})

	// init tabs
	function initSwiperTabs(selector, spaceBetween = 10) {
		return new Swiper(selector, {
			slidesPerView: 'auto',
			spaceBetween: spaceBetween,
			mousewheel: true,
			freeMode: true,
			scrollbar: {
				el: '.swiper-scrollbar',
			},
		})
	}

	initSwiperTabs('.help-now__tabs')
	initSwiperTabs('.projects-tile__tabs')
	initSwiperTabs('.animal__tabs', (spaceBetween = 30))
	initSwiperTabs('.animals__tabs')

	// swipers with common options
	function mergeOptions(customOptions = {}) {
		return { ...commonOptions, ...customOptions }
	}

	const commonOptions = {
		spaceBetween: 0,
		breakpoints: {
			320: {
				slidesPerView: 1,
				centeredSlides: true,
			},
			540: { slidesPerView: 2 },
			1024: { slidesPerView: 3 },
			1240: { slidesPerView: 4 },
		},
		keyboard: { enabled: true },
	}

	var projectSwiper = new Swiper(
		'.projects__swiper',
		mergeOptions({
			spaceBetween: 50,
			breakpoints: {
				320: { slidesPerView: 1 },
			},
			navigation: {
				prevEl: '.projects__swiper-prev',
				nextEl: '.projects__swiper-next',
			},
			effect: 'fade',
		})
	)

	new Swiper(
		'.animals__swiper',
		mergeOptions({
			breakpoints: {
				320: {
					centeredSlides: true,
					slidesPerView: 1,
				},
				540: { slidesPerView: 2 },
				1024: { slidesPerView: 3 },
				1240: { slidesPerView: 4 },
				1920: { slidesPerView: 5 },
			},
		})
	)

	new Swiper(
		'.partners__swiper',
		mergeOptions({
			spaceBetween: 15,
			grid: {
				fill: 'row',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					centeredSlides: true,
					grid: { rows: 1 },
				},
				540: {
					slidesPerView: 2,
					grid: { rows: 2 },
				},
				768: {
					slidesPerView: 3,
					grid: { rows: 2 },
				},
				1024: {
					slidesPerView: 4,
					grid: { rows: 2 },
				},
				1440: {
					slidesPerView: 5,
					grid: { rows: 2 },
				},
			},
			navigation: {
				prevEl: '.partners__swiper-prev',
				nextEl: '.partners__swiper-next',
			},
		})
	)

	new Swiper('.news__swiper', mergeOptions())

	new Swiper(
		'.team__swiper',
		mergeOptions({
			spaceBetween: 30,
			navigation: {
				prevEl: '.team__swiper-prev',
				nextEl: '.team__swiper-next',
			},
		})
	)

	new Swiper(
		'.animal__swiper',
		mergeOptions({
			slidesPerView: 2,
			breakpoints: {
				320: {
					slidesPerView: 3,
				},
			},
			spaceBetween: 10,
			watchSlidesProgress: true,
			navigation: {
				prevEl: '.animal__swiper-prev',
				nextEl: '.animal__swiper-next',
			},
		})
	)

	new Swiper(
		'.animal__swiper-preview',
		mergeOptions({
			grabCursor: true,
			slidesPerView: 1,
			breakpoints: {
				320: {
					slidesPerView: 1,
					centeredSlides: true,
				},
			},
			thumbs: { swiper: '.animal__swiper' },
			spaceBetween: 30,
			on: {
				// function to stop youtube video on slidechange
				slideChange: function (e) {
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
				// stop <video> on slidechange
				slideChange: function (e) {
					$('.swiper-slide').each(function () {
						var video = $(this).find('video').get(0)
						if (video) {
							video.pause()
						}
					})
				},
			},
		})
	)

	new Swiper(
		'.histories__swiper',
		mergeOptions({
			breakpoints: {
				320: {
					centeredSlides: true,
					slidesPerView: 1,
				},
				540: { slidesPerView: 2 },
				1024: { slidesPerView: 3 },
				1240: { slidesPerView: 4 },
				1920: { slidesPerView: 5 },
			},
		})
	)
})

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

var isSwapped = false
swapHeroContent()
