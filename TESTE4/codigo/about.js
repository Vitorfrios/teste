
/*
DIGITAR npm start NO TERMINAL PARA INICIALIZAR O JSON SERVER
npm start 
*/

const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

// ------------- FUNÇÂO PARA O RELÓGIO ------------- //
function setClock() {
    const now = new Date();
    const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
    const minutes = now.getMinutes() + seconds / 60;

    const secondsDegrees = ((seconds / 60) * 360*20) + 90;
    const minutesDegrees = ((minutes / 60) * 360*500) + 90;

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

    requestAnimationFrame(setClock); 
}

setClock(); 



// ----------- Função para navegação ---------- //

const navContainer = document.querySelector('.nav-container');
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-container ul li a');

function updateNavPosition() {
    const scrollY = window.scrollY;

    
    if (scrollY > header.offsetHeight) {
        navContainer.classList.add('scrolled');
    } else {
        navContainer.classList.remove('scrolled');
    }
}


window.addEventListener('scroll', function() {
    requestAnimationFrame(updateNavPosition);
});


navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); 

        const targetId = this.getAttribute('href'); 
        const targetElement = document.querySelector(targetId); 

        
        targetElement.scrollIntoView({
            behavior: 'smooth', 
            block: 'start' 
        });

        
        navContainer.classList.add('scrolled');
    });
});