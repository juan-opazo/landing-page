/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sections = document.querySelectorAll('section');
const navElements = [];
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
* @description Create li tags
* @param {object} section
* @returns {object} return a li element
*/
const createNavElement = function(section) {
    const navElement = document.createElement('li');
    navElement.textContent = section.getAttribute('data-nav');
    return navElement;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const docFragment = document.createDocumentFragment();
for(const section of sections) {
    const navElement = createNavElement(section);
    docFragment.appendChild(navElement);
    navElements.push(navElement);
}
const nav = document.querySelector('ul');
nav.className = 'navbar__list';
nav.appendChild(docFragment);

// Add class 'active' to section when near top of viewport
let activeSection = sections[0];
let activeNavElement = navElements[0];
activeSection.className = 'your-active-class';
activeNavElement.className = 'active';

/*
*   Whenever a scroll action is detected:
*   1. The class of every nav element and section is cleared
*   2. The first section viewed is detected by top method and its class is updated
*   3. Depending of the section detected, the nav element class is configured
*/
document.addEventListener('scroll', () => {
    for(let i = 0; i < sections.length; i++) {
        sections[i].className = '';
        navElements[i].className = '';
    }
    for(const section of sections) {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop <= 0) {
            activeSection = section;
        } else {
            break;
        }
    }
    activeSection.className = 'your-active-class';
    for(const navElement of navElements) {
        if(navElement.textContent === activeSection.getAttribute('data-nav')) {
            activeNavElement = navElement;
            break;
        }
    }
    activeNavElement.className = 'active';
    
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Scroll to section on link click
nav.addEventListener('click', e => {
    e.preventDefault();
    const itemClicked = document.querySelector(`[data-nav="${e.target.textContent}"]`);
    if(itemClicked) {
        window.scrollBy({
            top: itemClicked.getBoundingClientRect().top + 1,
            behavior: "smooth"
        });
    }
});
