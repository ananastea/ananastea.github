
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