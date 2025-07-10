//get-name.html
document.getElementById('nameForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('username').value.trim();

  // 👇 Add your real invited names here
  const allowedGuests = [
    "aya",
    "zizi",
    "selena",
    "bellya",
    "mama",
    "papa",
    "uti",
    "qaireen",
    "lio",
  ];

  // Check if the name is in the list (case-insensitive)
  const isInvited = allowedGuests.some(guest => guest.toLowerCase() === name.toLowerCase());

  if (isInvited) {
    // ✅ Save and continue
    localStorage.setItem('invitedName', name);
    window.location.href = `index.html?name=${encodeURIComponent(name)}`;
  } else {
    // ❌ Show error or go to not-invited page
    window.location.href = 'not-invited.html';
  }
});

