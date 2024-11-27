/*
DIGITAR npm start NO TERMINAL PARA INICIALIZAR O JSON SERVER
npm start 
*/

// Rolagem da tela
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


// Desativação dos links
document.addEventListener("DOMContentLoaded", () => {
    const iframes = document.querySelectorAll("iframe");

    iframes.forEach(iframe => {
        iframe.addEventListener("load", () => {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

            const allLinks = iframeDocument.querySelectorAll("a");
            allLinks.forEach(link => {
                link.removeAttribute("href");
                link.style.pointerEvents = "none";
                link.style.cursor = "default";
                link.addEventListener("click", event => event.preventDefault());
            });
        });
    });
});