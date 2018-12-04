function mobileMenu() {
	const navTrigger = document.querySelector('.hamburger');
	const trigger = document.querySelector('.hamburger-menu-link');
	const navMobile = document.querySelector('.popup');
	const navItems = document.querySelectorAll('.popup__item');
  
	trigger.addEventListener('click', toggleClass);
  
	for (const iterator of navItems) {
	  iterator.addEventListener('click', toggleClass);
	}
  
	function toggleClass(e) {
	  e.preventDefault();
	  navTrigger.classList.toggle('is-active');
	  navMobile.classList.toggle('is-active');
	}
  }
  
  mobileMenu();


function showUp () {
	const composition = document.querySelectorAll('.burger__composition--top');
	const ingredients = document.querySelectorAll('.burger__composition--hover');

	for (const composItem of composition) {
		composItem.addEventListener('mouseover', hiddenMenu);
		composItem.addEventListener('mouseout', hiddenMenu);
	}

	function hiddenMenu(e) {
		e.preventDefault();
		for (const item of ingredients) {
			item.classList.toggle('open');
		};
	};
};

showUp();

function mySlider() {
	const next = document.querySelector('.scroll--right');
	const prev = document.querySelector('.scroll--left');
	const list = document.querySelector('.burgers__list');
	const items = list.querySelectorAll('.burgers__item');
  
	next.addEventListener('click', moveNext);
	prev.addEventListener('click', movePrev);
  
	let num = 2;
  
	function moveNext() {
	  num++;
	  if (num > items.length) {
		num = 1;
	  }
	  setOrder();
	  list.classList.remove('is-reverse');
	  moveItem();
	}
	function movePrev() {
	  num--;
	  if (num === 0) {
		num = items.length;
	  }
	  setOrder();
	  list.classList.add('is-reverse');
	  moveItem();
	}
	function setOrder() {
	  let key = num;
  
	  for (const i of items) {
		i.style.order = key;
		key++;
		if (key > items.length) {
		  key = 1;
		}
	  }
	}
	function moveItem() {
	  list.classList.remove('is-move');
	  setTimeout(() => {
		list.classList.add('is-move');
	  }, 50);
	}
  }
  
	mySlider();
	
	function accordionMenu() {
		const menuItems = document.querySelectorAll('.menu__item');
		const menuAccord = document.querySelector('.menu__acco-list');
	
		menuAccord.addEventListener('click', event => {
			event.preventDefault();
			let target = event.target.parentNode;
			let content = target.nextElementSibling;
			let item = target.parentNode;
	
			const tarWidth = target.clientWidth;
			const windowWidth = document.documentElement.clientWidth;
			const layoutContentWidth = 520;
			const breackpointPhone = 480;
			const closeMenuWidth = tarWidth * menuItems.length;
			const openMenuWidth = closeMenuWidth + layoutContentWidth;
	
			if (event.target.classList.contains('menu__title')) {
				moveMenu();
			}
			target = event.target;
			content = target.nextElementSibling;
			item = target.parentNode;
	
			if (target.classList.contains('menu__link')) {
				moveMenu();
			}
	
			function moveMenu() {
				for (const iterator of menuItems) {
					if (iterator != item) {
						iterator.classList.remove('is-active');
						iterator.lastElementChild.style.width = 0;
						menuAccord.style.transform = 'translateX(0)';
					}
				}
	
				if (item.classList.contains('is-active')) {
					item.classList.remove('is-active');
					content.style.width = 0;
				} else {
					item.classList.add('is-active');
					content.style.width = layoutContentWidth + 'px';
					if (windowWidth > breackpointPhone && windowWidth < openMenuWidth) {
						content.style.width = windowWidth - closeMenuWidth + 'px';
					} else if (windowWidth <= breackpointPhone) {
						let num;
						for (let i = 0; i < menuItems.length; i++) {
							if (menuItems[i] === item) {
								num = menuItems.length - (i + 1);
							}
							menuAccord.style.transform = `translateX(${tarWidth * num}px)`;
							content.style.width = windowWidth - tarWidth + 'px';
						}
					} else {
						content.style.width = layoutContentWidth + 'px';
					}
				}
			}
		});
	}
	
	accordionMenu();


	function teamAccordion(){
	const accItems = document.querySelectorAll('.team-acco__trigger');

  for (let i = 0; i < accItems.length; i++) {
    const accLink = accItems[i];
    
    accLink.addEventListener('click', function() {
      	event.preventDefault();
      for (let i = 0; i < accItems.length; i++) {
        const accLink = accItems[i];
        if (accLink != event.currentTarget) {
        accLink.parentElement.classList.remove('active');
        }
      };

      if (accLink == event.currentTarget) {
        accLink.parentElement.classList.toggle('active');
      };

    });
	};
}
	teamAccordion();

function createOverlay(template) {
	let fragment = document.createElement('div');

	fragment.innerHTML = template;

	const overlayElement = fragment.querySelector('.overlay');
	const headElement = fragment.querySelector('.overlay__head');
	const contentElement = fragment.querySelector('.overlay__content');
	const closeElement = fragment.querySelector('.overlay__close');

	fragment = null;

	overlayElement.addEventListener('click', event => {
		if (event.target === overlayElement) {
			closeElement.click();
		}
	});

	closeElement.addEventListener('click', event => {
		event.preventDefault();
		document.body.removeChild(overlayElement);
	});

	return {
		open() {
			document.body.appendChild(overlayElement);
		},
		close() {
			closeElement.click();
		},
		setContent(head, content) {
			headElement.innerHTML = head;
			contentElement.innerHTML = content;
		}
	};
};
function sentFormData() {
	const myForm = document.querySelector('.form__elem');
	const sendBtn = document.querySelector('.btn--form');

	sendBtn.addEventListener('click', function (event) {
		event.preventDefault();
		let formData =  new FormData(myForm);

		formData.append('name', myForm.elements.name.value);
		formData.append('phone', myForm.elements.phone.value);
		formData.append('comment', myForm.elements.comment.value);
		formData.append('to', 'barsukova.nastya@mail.ru');

		const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(JSON.stringify(formData));
		const overlay = createOverlay(document.querySelector('#overlayTemplate').innerHTML);
		xhr.addEventListener('load', () => {
			overlay.open();
			if (xhr.status <= 400) {
				const message = 'Заказ оформлен';
				overlay.setContent('', message);
			} else {
				const message = 'Ошибка! ';
				overlay.setContent('', message);
			}
		});
	});
};
sentFormData();

function reviewsOverlay() {

	const openButton = document.querySelector('.reviews__list');
	const template = document.querySelector('#overlayTemplate').innerHTML;
	const overlay = createOverlay(template);


	openButton.addEventListener('click', event => {
		event.preventDefault();
		const target = event.target;

		let name = target.parentNode.firstElementChild.textContent;
		let contentRev = target.parentNode.firstElementChild.nextElementSibling.textContent;

		if (target.classList.contains('btn-reviews')) {
			overlay.open();
			overlay.setContent(name, contentRev);
		}
	});
};
reviewsOverlay();


function onePageScroll() {
  const wrapper = document.querySelector('.wrapper');
  const content = wrapper.querySelector('.maincontent');
  const pages = content.querySelectorAll('.section');
  const points = document.querySelectorAll('.point__item');
  const dataScrollto = document.querySelectorAll('[data-scroll-to]');

  let isScroll = false;

  addNavigation();
  wheel();
  keyPush();

  function moveToPage(numPage) {
    const position = `${numPage * -100}%`;

    if (isScroll) return;

    isScroll = true;

    addClass(pages);
		setTimeout(() => {
      isScroll = false;
      addClass(points);
    }, 1000);
    content.style.transform = `translateY(${position})`;
		function addClass(arr) {
      arr[numPage].classList.add('is-active');
      for (const iterator of arr) {
        if (iterator !== arr[numPage]) {
          iterator.classList.remove('is-active');
        }
      }
    }
  }
  

  function addNavigation() {
    for (const iterator of dataScrollto) {
      iterator.addEventListener('click', e => {
        e.preventDefault();
        moveToPage(iterator.dataset.scrollTo);
      });
    }
  }

  function wheel() {
    document.addEventListener('wheel', e => {
      const direct = e.deltaY > 0 ? 'up' : 'down';

      scrollToPage(direct);
    });
  }

  function definePage(arr) {
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element.classList.contains('is-active')) {
        return {
          elIndex: i,
          elActive: element,
          elNext: element.nextElementSibling,
          elPrev: element.previousElementSibling
        };
      }
    }
  }

  function scrollToPage(direct) {
    let page = definePage(pages);

    if (direct === 'up' && page.elNext) {
      let numPage = page.elIndex + 1;
      moveToPage(numPage);
    }
    if (direct === 'down' && page.elPrev) {
      let numPage = page.elIndex - 1;
      moveToPage(numPage);
    }
  }

  function keyPush() {
    document.addEventListener('keydown', e => {
      console.log(e.keyCode);
      switch (e.keyCode) {
        case 40:
          scrollToPage('up');
          break;
        case 38:
          scrollToPage('down');
          break;
        default:
          break;
      }
    });
  }

  if (isMobileDevice()) swipe();

  function swipe() {
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener(
      'touchstart',
      e => {
        touchStartY = e.changedTouches[0].screenY;
      },
      false
    );

    wrapper.addEventListener('touchmove', e => e.preventDefault());

    document.addEventListener(
      'touchend',
      e => {
        touchEndY = e.changedTouches[0].screenY;
        let direct = swipeDirect();
        scrollToPage(direct);
      },
      false
    );

    function swipeDirect() {
      let dif = touchStartY - touchEndY;
      if (dif > 100) {
        return 'up';
      } else if (dif < -100) {
        return 'down';
      }
    }
  }

  function isMobileDevice() {
    return (
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.indexOf('IEMobile') !== -1
    );
  }
}

onePageScroll();

function yandexMap() {

	ymaps.ready(init);

	const placemarks = [
			{ 
					latitude: 59.97, 
					longitude: 30.31, 
					hintContent: 'Наш адрес',
					balloonContent: 'улица Литераторов, 17',
					
			},
			{
					latitude: 59.89, 
					longitude: 30.32, 
					hintContent: 'Наш адрес',
					balloonContent: 'Московский проспект, 100',
			},
			{
					latitude: 59.93, 
					longitude: 30.34, 
					hintContent: 'Наш адрес',
					balloonContent: 'Наб. реки Фонтанки, 56',
			},
			{
				latitude: 59.93, 
				longitude: 30.40, 
				hintContent: 'Наш адрес',
				balloonContent: 'Малоохтинский проспект, 61',
		}
	];

			geoObjects = [];

	function init() {
			const map = new ymaps.Map('map', {
					center: [59.94, 30.32],
					zoom: 12,
					controls: ['zoomControl'],
					behaviors: ['drag'] 
			});

	for (let i = 0; i < placemarks.length; i++) {
							geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], 
							{
									hintContent: placemarks[i].hintContent,
									balloonContent: placemarks[i].balloonContent
							},
							{
									iconLayout: 'default#image',
									iconImageHref: 'img/map-marker.svg',
									iconImageSize: [46, 57],
									iconImageOffset: [-23, -57] 
							});
			}
			
			const clusterer = new ymaps.Clusterer({
					clusterIcons: [
							{
									href:  'img/map-marker.svg',
									size: [100, 100],
									offset: [-50, -50]
							}
					],
					clusterIconContentLayout: null
			});

			map.geoObjects.add(clusterer);
			clusterer.add(geoObjects);
	}
}
yandexMap();


let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
			  width: '660',
        height: '405',
        videoId: 'M7lc1UVf-VE',
        playerVars: {
            controls: 0,
            disablekb: 0,
            modestbranding: 0,
            rel: 0,
            autoplay: 0,
            showinfo: 0
        },
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
}

const vid = document.getElementById("myVideo");
function myVideo() { 
    vid.load();
} 

function onPlayerStateChange(event) {

    switch(event.data) {
        case 1:
            $('.player__start').addClass('paused');
            $('.player__wrapper').addClass('active');
            break;
        case 2:
            $('.player__start').removeClass('paused');
    }
}

function onPlayerReady() {
    const duration = player.getDuration();
    let interval;

    $('.player').removeClass('hidden');
    updateTimer();
    clearInterval(interval);
    interval = setInterval(() => {
        const completed = player.getCurrentTime();
        const percent = (completed / duration) * 100;

        updateTimer();
        changeButtonPosition(percent);

    }, 1000);
}

function updateTimer() {
    $('.player__duration-completed').text(formatTime(player.getCurrentTime()));
    $('.player__duration-estimate').text(formatTime(player.getDuration()));
}

function formatTime(time) {
    const roundTime = Math.round(time);

    const minutes = Math.floor(roundTime / 60);
    const seconds = roundTime - minutes * 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return minutes + ":" + formattedSeconds;
}

$('.player__start').on('click', e => {
    const playerStatus = player.getPlayerState(); // 0 - ended, 1 - played, 2 - paused ...


    if (playerStatus !== 1 ) {
        player.playVideo();
    } else {
        player.pauseVideo();
    }
});

$('.player__playback').on('click', e => {
    const bar = $(e.currentTarget);
    const newButtonPosition = e.pageX - bar.offset().left;
    const clickedPercent = (newButtonPosition / bar.width()) * 100;
    const newPlayerTime = (player.getDuration() / 100) * clickedPercent;

    changeButtonPosition(clickedPercent);
    player.seekTo(newPlayerTime);
});

$('.player__splash').on('click', e => {
    player.playVideo();
})

function changeButtonPosition(percent) {
    $('.player__playback-button').css({
        left: `${percent}%`
    });
}
