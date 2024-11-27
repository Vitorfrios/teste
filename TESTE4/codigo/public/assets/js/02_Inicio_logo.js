
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




