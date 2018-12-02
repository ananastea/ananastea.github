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
        xhr.send(formData);
		const overlay = createOverlay(document.querySelector('#overlayTemplate').innerHTML);
		xhr.addEventListener('load', () => {
			overlay.open();
			if (xhr.status <= 400) {
				const message = xhr.response.message;
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




