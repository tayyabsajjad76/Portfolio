const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      successMessage.classList.remove("hidden");
      form.reset();
    } else {
      alert("Oops! There was a problem submitting your form.");
    }
  } catch (error) {
    alert("Oops! There was a problem submitting your form.");
  }
});
