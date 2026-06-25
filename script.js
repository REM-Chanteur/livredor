const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbytuAedn3CtcZw-8lPzTT9LqZcf9Un7qlq63I_YmpS508RyckUMEhLVp4ahdJRK4v5_oA/exec";

document.getElementById("guestbook-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const status = document.getElementById("status");
    const formData = new FormData(this);

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            status.textContent = "Merci ! Votre message a été envoyé et sera publié après validation.";
            status.style.color = "#4CAF50";
            this.reset();
        } else {
            throw new Error();
        }
    } catch (err) {
        status.textContent = "Erreur lors de l'envoi. Réessayez plus tard.";
        status.style.color = "#ff4444";
    }
});
