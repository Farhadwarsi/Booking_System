const form = document.getElementById("booking-form");
const confirmation = document.getElementById("confirmation");

// Change this if backend runs on a different port
const API_URL = "http://localhost:5000/api/bookings";

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const bookingData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    service: document.getElementById("service").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) {
      throw new Error("Failed to save booking");
    }

    const result = await res.json();

    confirmation.classList.remove("hidden");
    confirmation.innerHTML = `
      <h3>${result.message}</h3>
      <p><strong>Name:</strong> ${bookingData.name}</p>
      <p><strong>Email:</strong> ${bookingData.email}</p>
      <p><strong>Service:</strong> ${bookingData.service}</p>
      <p><strong>Date:</strong> ${bookingData.date}</p>
      <p><strong>Time:</strong> ${bookingData.time}</p>
    `;

    form.reset();
  } catch (err) {
    console.error("❌ Error:", err);
    alert("Error saving booking! Check console for details.");
  }
});
