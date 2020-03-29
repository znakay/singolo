"use strict"

window.onload = function () {
    scrollIvent();
    burgerMenuHandler();
    rotateBurgerButton();
    closeBurgerMenuByClickBurgerMenuItem();
    closeBurgerMenuByClickOverlay();
    addNavClickHandler();
    slider();
    activeScreenVerticalMobile();
    activeScreenHorizontalMobile();
    addTagsClickHandler();
    addBorderPortfolioImgHandler();
    submitForm();
}

// window.addEventListener('resize', () => {
//     if (window.offsetWidth <= 767) {
//         document.querySelector('.portfolio__content').innerHTML = getDefaultPortfolio().join('');
//     }
// })

const scrollIvent = () => {
    document.addEventListener('scroll', () => {
        const currentPostion = window.scrollY;
        const sections = document.querySelectorAll('section');
        const links = document.querySelectorAll('.navigation__link');

        sections.forEach(section => {
            if (section.offsetTop - 95 <= currentPostion && ((section.offsetTop - 95) + section.offsetHeight) > currentPostion) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (section.getAttribute('id') === link.getAttribute('href').substring(1)) {
                        link.classList.add('active');
                    }
                })
            }
        })
    });
}

//Navigation
const addNavClickHandler = () => {
    let navigation = document.getElementById('menu');

    navigation.addEventListener('click', (event) => {
        if (event.target.classList.contains('navigation__link')) {
            let clikedItem = event.target;

            removeSelectedItem();
            selectClickedItem(clikedItem);
        }
    });
};

const closeBurgerMenuByClickBurgerMenuItem = () => {
    let navigation = document.querySelector('.burger-menu-content #menu');

    navigation.addEventListener('click', (event) => {
        if (event.target.classList.contains('navigation__link')) {
            closeBurgerMenu();
        }
    });    
}

const removeSelectedItem = () => {
    let items = document.querySelectorAll('.navigation__link');

    items.forEach(element => {
        element.classList.remove('active');
    });
};

const selectClickedItem = (clikedItem) => {
    clikedItem.classList.add('active');
    console.log('clickItem');
}

const rotateBurgerButton = () => {
    document.querySelector('.burger-button').addEventListener('click', () => {
        document.querySelector('.burger-button').classList.toggle('active');
    });
};

const burgerMenuHandler = () => {
    const burgerButton = document.querySelector('.burger-button');
    const menu = document.querySelector('.burger-menu');

    burgerButton.addEventListener('click', () => {
        menu.classList.toggle('active');
        offsetLogo();
        overlayMenu();
    });
};

const offsetLogo = () => {
    const logo = document.querySelector('.header__content-mobile .logo');
    logo.classList.toggle('open-menu')
};

const overlayMenu = () => {
    const overlay = document.querySelector('.burger-menu-overlay');
    overlay.classList.toggle('open-menu');
}

const closeBurgerMenuByClickOverlay = () => {
    const overlay = document.querySelector('.burger-menu-overlay');

    overlay.addEventListener('click', () => {
        closeBurgerMenu();
    })
}

const closeBurgerMenu = () => {
    document.querySelector('.burger-button').classList.remove('active');
    document.querySelector('.header__content-mobile .logo').classList.remove('open-menu');
    document.querySelector('.burger-menu-overlay').classList.remove('open-menu');
    document.querySelector('.burger-menu').classList.remove('active');
}

//Slider
const slider = () => {
    multiItemSlider('.slider__content');
};

let multiItemSlider = (function () {
    return function (selector) {
        let
            _sliderWrapper = document.querySelector('.slider__wrapper'),
            _sliderItems = document.querySelectorAll('.slide'),
            _sliderControls = document.querySelectorAll('.arrow-button'),
            _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width),
            _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),
            _positionLeftItem = 0,
            _transform = 0,
            _step = _itemWidth / _wrapperWidth * 100,
            _items = [];

        _sliderItems.forEach((item, index) => {
            _items.push({ item: item, position: index, transform: 0 });
        });

        let position = {
            getItemMin() {
                let indexItem = 0;

                _items.forEach((item, index) => {
                    if (item.position < _items[indexItem].position) {
                        indexItem = index;
                    }
                });

                return indexItem;
            },
            getItemMax() {
                let indexItem = 0;

                _items.forEach((item, index) => {
                    if (item.position > _items[indexItem].position) {
                        indexItem = index;
                    }
                });

                return indexItem;
            },
            getMin() {
                return _items[position.getItemMin()].position;
            },
            getMax() {
                return _items[position.getItemMax()].position;
            },
        };

        let transformItem = (direction) => {
            let nextItem;

            if (direction === 'right') {
                _positionLeftItem++;

                if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
                    nextItem = position.getItemMin();
                    _items[nextItem].position = position.getMax() + 1;
                    _items[nextItem].transform += _items.length * 100;
                    _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
                }
                _transform -= _step;
            }

            if (direction === 'left') {
                _positionLeftItem--;

                if (_positionLeftItem < position.getMin()) {
                    nextItem = position.getItemMax();
                    _items[nextItem].position = position.getMin() - 1;
                    _items[nextItem].transform -= _items.length * 100;
                    _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
                }
                _transform += _step;
            }
            _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        };

        let controlClick = (event) => {
            let direction = event.target.classList.contains('arrow-right') ? 'right' : 'left';
            transformItem(direction);
            swapBackgroudColor();
        };

        let setUpListeners = () => {
            _sliderControls.forEach(item => {
                item.addEventListener('click', controlClick);
            });
        };

        setUpListeners();

        return {
            right: () => transformItem('right'),
            left: () => transformItem('left')
        }
    }
}());

const swapBackgroudColor = () => {
    document.querySelector('.slider').classList.toggle('second-background');
};

//Vertical modile phone
const activeScreenVerticalMobile = () => {
    document.getElementById('vertical_phone').addEventListener('click', () => {
        document.getElementById('vertical_screen').classList.toggle('active');
    });
};

//Horizontal mobile phone
const activeScreenHorizontalMobile = () => {
    document.getElementById('horizontal_phone').addEventListener('click', () => {
        document.getElementById('horizontal_screen').classList.toggle('active');
    });
}

//Tags
const addTagsClickHandler = () => {
    document.getElementById('tags').addEventListener('click', (event) => {
        if (event.target.classList.contains('tag')) {
            let clickedTag = event.target;

            removeSelectedTags();
            selectClickedTag(clickedTag);

            switch (clickedTag.innerHTML) {
                case 'All':
                    showContentAllTag();
                    break;
                case 'Web Design':
                    showContentWebDesignTag();
                    break;
                case 'Graphic Design':
                    showContentGraphicDesignTag();
                    break;
                case 'Artwork':
                    showContentArtworkTag();
                    break;
            }
        }
    });
}

const removeSelectedTags = () => {
    let tags = document.querySelectorAll('.portfolio__tags .tag');

    tags.forEach(tag => {
        tag.classList.remove('tag__selected');
        tag.classList.add('tag__inactive');
    })
}

const selectClickedTag = (clickedTag) => {
    clickedTag.classList.remove('tag__inactive');
    clickedTag.classList.add('tag__selected');
}

//Возвращает стандартный массив разметки картинок
let getDefaultPortfolio = () => {
    let defaultMarkUp = [];

    // let sizePortfolioImg = document.querySelectorAll('.portfolio__content img').length;


    for (let i = 0; i < document.querySelectorAll('.portfolio__content img').length; i++) {
        defaultMarkUp[i] = `<img class="portfolio__image" src="assets/img/portfolio/portfolio${i + 1}.png" alt="portfolio__image">`
    }

    // if (window.offsetWidth <= 767) {
    //     defaultMarkUp = defaultMarkUp.slice(0, 8);
    // }

    return defaultMarkUp;
}

const showContentAllTag = () => {
    document.querySelector('.portfolio__content').innerHTML = getDefaultPortfolio().join('');
}

const showContentWebDesignTag = () => {
    document.querySelector('.portfolio__content').innerHTML = getDefaultPortfolio().reverse().join('');
}

const showContentGraphicDesignTag = () => {
    let buffArray = getDefaultPortfolio();
    let oddIndex = [], evenIndex = [], totalList = [];

    for (let i = 0; i < buffArray.length; i++) {
        (i + 1) % 2 == 0 ? evenIndex.push(buffArray[i]) : oddIndex.push(buffArray[i]);
    }

    totalList = oddIndex.concat(evenIndex);

    document.querySelector('.portfolio__content').innerHTML = totalList.join('');
}

const showContentArtworkTag = () => {
    let buffArray = getDefaultPortfolio();

    for (let i = 0; i < buffArray.length; i += 2) {
        let buff = buffArray[i];
        buffArray[i] = buffArray[i + 1];
        buffArray[i + 1] = buff;
    }

    document.querySelector('.portfolio__content').innerHTML = buffArray.join('');
}

//Portfolio image border
const addBorderPortfolioImgHandler = () => {
    let portfolio = document.getElementById('portfolio');

    portfolio.addEventListener('click', (event) => {
        if (event.target.classList.contains('portfolio__image')) {
            let clickedImage = event.target;

            removeSelectedImage();
            selectClickedImage(clickedImage);
        }
    });
}

const removeSelectedImage = () => {
    let images = document.querySelectorAll('.portfolio__content .portfolio__image');

    images.forEach(image => {
        image.classList.remove('active');
    })
}

const selectClickedImage = (clickedImage) => {
    clickedImage.classList.add('active');
}

// FORM
const submitForm = () => {
    document.getElementById('send').addEventListener('click', (event) => {
        event.preventDefault();

        const MODAL_WINDOW_THEME = document.getElementById('theme');
        const MODAL_WINDOW_DESCRIPTION = document.getElementById('description');

        let theme = document.getElementById('subject').value.toString();
        let description = document.getElementById('detail').value.toString();

        MODAL_WINDOW_THEME.innerHTML = checkThemeField(theme);
        MODAL_WINDOW_DESCRIPTION.innerHTML = checkDescriptionField(description);

        if (!document.getElementById('name').value.toString().length) {
            showAlertNameFieldForm();
        } else if (!document.getElementById('email').value.toString().length) {
            showAlertEmailFieldForm();
        } else {
            showModalWindow();
        }
    });

    hideAlertNameFieldForm();
    hideAlertEmailFieldForm();

    closeModalWindow();
}

const checkThemeField = (theme) => {
    if (!theme.length) return 'Без темы';
    return theme;
}

const checkDescriptionField = (description) => {
    if (!description.length) return 'Без описания';
    return description;
}

const showModalWindow = () => {
    document.getElementById('overlay-block').classList.remove('hidden');
}

const showAlertNameFieldForm = () => {
    document.getElementById('alert-name').classList.add('alert');
}

const hideAlertNameFieldForm = () => {
    document.getElementById('name').addEventListener('click', () => {
        document.getElementById('alert-name').classList.remove('alert');
    });
}

const showAlertEmailFieldForm = () => {
    document.getElementById('alert-email').classList.add('alert');
}

const hideAlertEmailFieldForm = () => {
    document.getElementById('email').addEventListener('click', () => {
        document.getElementById('alert-email').classList.remove('alert');
    });
}

const closeModalWindow = () => {
    document.getElementById('close-button').addEventListener('click', () => {
        document.getElementById('overlay-block').classList.add('hidden');
        document.getElementById('quote-form').reset();
    });
}