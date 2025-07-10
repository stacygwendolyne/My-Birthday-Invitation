//get-name
// Check if the invitedName exists in localStorage
if (!localStorage.getItem('invitedName')) {
  window.location.href = "index.html"; // Replace with your login page
}

document.addEventListener("DOMContentLoaded", function () {
  const name = localStorage.getItem('invitedName');
  const greeting = document.getElementById('greeting');

  if (name) {
    greeting.textContent = `Hi ${name}, you're invited to Nib's Birthday! 🎉`;
  } else {
    greeting.textContent = "Oops! You're not invited or haven't entered your name!";
  }

    // ✅ Play "pop" sound ONCE
    const popSound = new Audio('assets/confetti-pop.mp3');
    popSound.volume = 0.8;
    popSound.play();

    // 🎊 Start confetti loop
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        startVelocity: 50,
        angle: 90,
        spread: 45,
        origin: {
          x: Math.random(),
          y: 1
        },
        colors: ['#334eac', '#f7f2eb', '#eff146'],
        gravity: 0.5,
        scalar: 1.2
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
});

//the-vinyl
let angle = 0;
let spinning = false;
let animationFrameId;
let noteInterval;

function rotateVinyl() {
  const vinylImg = document.getElementById("vinyl-img");
  angle += 0.5;
  if (angle >= 360) angle = 0;
  vinylImg.style.transform = `rotate(${angle}deg)`;
  if (spinning) {
    animationFrameId = requestAnimationFrame(rotateVinyl);
  }
}

function startFloatingNotes() {
  const container = document.getElementById('notes-container');
  const emojis = ['𝄞', '⟡', '♫', '♬'];

  noteInterval = setInterval(() => {
    const note = document.createElement('span');
    note.classList.add('note');
    note.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    note.style.left = `${Math.random() * 60 - 30}px`; // Wider spread
    container.appendChild(note);

    setTimeout(() => {
      note.remove();
    }, 2000);
  }, 300);
}

function stopFloatingNotes() {
  clearInterval(noteInterval);
}

function toggleMusic() {
  const music = document.getElementById("bg-music");
  const vinyl = document.getElementById("vinyl-img");
  const emoji = document.getElementById("emoji");

  if (music.paused) {
    music.play();
    spinning = true;
    rotateVinyl();
    emoji.classList.add("active");
    startFloatingNotes();
  } else {
    music.pause();
    spinning = false;
    cancelAnimationFrame(animationFrameId);
    emoji.classList.remove("active");
    stopFloatingNotes();
  }
}

// 🧠 Auto-start vinyl spinning if music already plays on load
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");

  // Wait a tick for autoplay policies
  setTimeout(() => {
    if (!music.paused) {
      // music already autoplayed, so start animation & notes
      spinning = true;
      rotateVinyl();
      document.getElementById("emoji").classList.add("active");
      startFloatingNotes();
    }
  }, 500);
});

//button sound pop
const buttons = document.querySelectorAll('.button-awal');
const popSound = new Audio('assets/pop.mp3');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    popSound.currentTime = 0; // rewind if clicked quickly
    popSound.play();
  });
});

//onclick js
function scrollToSection(id) {
  const section = document.getElementById(id);
  section.scrollIntoView({ behavior: 'smooth' });
}

//details fade in-out
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible'); // remove this line if you only want fade-in
    }
  });
});

document.querySelectorAll('.fade-section').forEach(section => {
  observer.observe(section);
});




//JS (Dynamic Guest Addition)
// ✅ Manual guest list (you define it!)
// Load guest list or initialize
// Replace with your actual Apps Script Web App URL
const sheetUrl = 'https://script.google.com/macros/s/AKfycbzVgxQh5ntLGzE7hBdwnhbyKlO8A62akQ-R3EgLy8FZ/exec';

function fetchGuests() {
  fetch(sheetUrl)
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById('guest-tbody');
      tbody.innerHTML = '';

      data.forEach((guest, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${guest.name}</td>
          <td><input type="checkbox" ${guest.coming ? 'checked' : ''} onchange="updateRSVP('${guest.name}', this.checked)"></td>
        `;
        tbody.appendChild(row);
      });
    });
}

document.addEventListener('DOMContentLoaded', fetchGuests);

function updateRSVP(name, coming) {
  fetch(sheetUrl, {
    method: 'POST',
    body: JSON.stringify({ name, coming }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(() => fetchGuests()); // refresh table
}




//CARDS
function nextCard() {
  const container = document.getElementById('card-container');
  container.scrollBy({ left: 300, behavior: 'smooth' });
}

function prevCard() {
  const container = document.getElementById('card-container');
  container.scrollBy({ left: -300, behavior: 'smooth' });
}




window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const notesContainer = document.getElementById("notes-container");

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      const theme = section.getAttribute("data-theme");

      if (theme === "light") {
        notesContainer.classList.remove("on-dark");
        notesContainer.classList.add("on-light");
      } else {
        notesContainer.classList.remove("on-light");
        notesContainer.classList.add("on-dark");
      }
    }
  });
});


//GALLERY













//ALERT
function showToast(message) {
  const toast = document.getElementById("toast-alert");
  const text = document.getElementById("toast-text");

  text.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000); // Show for 3 seconds
}

//DELETE
function addGuestToTable(name, index) {
  const tbody = document.getElementById('guest-body');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${index}</td>
    <td>${name}</td>
    <td>
      <button class="delete-btn" onclick="deleteGuest(${index - 1})">
        🗑️
      </button>
    </td>
  `;

  tbody.appendChild(row);
}

function deleteGuest(index) {
  guests.splice(index, 1); // Remove from array
  localStorage.setItem('guests', JSON.stringify(guests)); // Save updated list

  // Clear and re-render the table
  tbody.innerHTML = '';
  guests.forEach((name, i) => addGuestToTable(name, i + 1));
}

function deleteGuest(index) {
  if (!confirm("Are you sure you want to remove this guest?")) return;

  guests.splice(index, 1);
  localStorage.setItem('guests', JSON.stringify(guests));
  tbody.innerHTML = '';
  guests.forEach((name, i) => addGuestToTable(name, i + 1));
}







