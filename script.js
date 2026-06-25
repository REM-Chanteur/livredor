// Remplace cette adresse par l'URL de ton Google Apps Script si tu veux enregistrer les messages.
const GOOGLE_SCRIPT_URL = "";

document.getElementById("guestbook-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const status = document.getElementById("status");

  if (!GOOGLE_SCRIPT_URL) {
    status.textContent = "Message prêt, mais l'enregistrement n'est pas encore connecté.";
    return;
  }

  const formData = new FormData(e.target);

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formData
    });

    status.textContent = "Merci, votre message a bien été envoyé.";
    e.target.reset();
  } catch (err) {
    status.textContent = "Erreur d'envoi. Réessayez plus tard.";
  }
});
