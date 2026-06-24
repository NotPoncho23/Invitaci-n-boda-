// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ---------- Countdown ----------
// EDITA AQUÍ la fecha/hora exacta de la boda (zona horaria CDMX = -06:00)
const WEDDING_DATE = new Date('2026-10-25T17:00:00-06:00');

function updateCountdown(){
  const now = new Date();
  let diff = WEDDING_DATE - now;
  if (diff < 0) diff = 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2,'0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ---------- Add to Google Calendar ----------
// EDITA AQUÍ: nombre y dirección reales del salón
const EVENT_TITLE = 'Boda de Caro y Gil';
const EVENT_LOCATION = 'Jardín GAIA, Periferico Paseo de la República, 3140, Ex Hacienda de la Huerta - Morelia, Michoacán';
const EVENT_DETAILS = '¡Nos casamos! Nos encantaría que nos acompañes a celebrar este día tan especial.';
const EVENT_START = '20261025T170000';
const EVENT_END   = '20261025T230000';

function buildCalendarUrl(){
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENT_TITLE,
    dates: `${EVENT_START}/${EVENT_END}`,
    details: EVENT_DETAILS,
    location: EVENT_LOCATION
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

document.getElementById('calendarBtn').addEventListener('click', () => {
  window.open(buildCalendarUrl(), '_blank', 'noopener');
});

// ---------- "Cómo llegar" button ----------
// EDITA AQUÍ: usa la dirección real para que abra la ruta correcta en Google Maps
const VENUE_QUERY = encodeURIComponent('Jardin Gaia, Morelia, Michoacán');
document.getElementById('mapsBtn').href = `https://www.google.com/maps/search/?api=1&query=${VENUE_QUERY}`;
