const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbytuAedn3CtcZw-8lPzTT9LqZcf9Un7qlq63I_YmpS508RyckUMEhLVp4ahdJRK4v5_oA/exec";

const form = document.getElementById("guestbook-form");
const statusText = document.getElementById("status");
const messagesContainer = document.getElementById("messages");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  statusText.textContent = "Envoi en cours...";
  statusText.style.color = "#d9a72b";

  const formData = new FormData(form);

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    statusText.textContent = "Merci ! Votre message a été envoyé et sera publié après validation.";
    statusText.style.color = "#4CAF50";
    form.reset();
  } catch (err) {
    statusText.textContent = "Erreur lors de l'envoi. Réessayez plus tard.";
    statusText.style.color = "#ff4444";
  }
});

function afficherMessages(data) {
  messagesContainer.innerHTML = "";

  if (!Array.isArray(data) || data.length === 0) {
    messagesContainer.innerHTML = "<p>Aucun message validé pour le moment.</p>";
    return;
  }

  data
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach(item => {
      const article = document.createElement("article");
      article.innerHTML = `
        <strong>${escapeHtml(item.nom || "Anonyme")}</strong>
        <div class="message-meta">${escapeHtml(item.ville || "")}</div>
        <span>${escapeHtml(item.note || "★★★★★")}</span>
        <p>${escapeHtml(item.message || "")}</p>
      `;
      messagesContainer.appendChild(article);
    });
}

function chargerMessages() {
  const oldScript = document.getElementById("jsonp-loader");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.id = "jsonp-loader";
  script.src = GOOGLE_SCRIPT_URL + "?callback=afficherMessages&t=" + Date.now();
  document.body.appendChild(script);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

chargerMessages();
setInterval(chargerMessages, 60000);
