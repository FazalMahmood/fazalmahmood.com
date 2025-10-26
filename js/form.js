document.addEventListener("DOMContentLoaded", function() {

    // Select elements
    const captchaQuestion = document.getElementById("captchaQuestion");
    const captchaInput = document.getElementById("captchaInput");
    const captchaError = document.getElementById("captchaError");
    const contactForm = document.getElementById("contactForm");

    // Generate CAPTCHA
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let captchaResult = num1 + num2;
    captchaQuestion.textContent = `What is ${num1} + ${num2}?`;

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // CAPTCHA validation
        const userAnswer = parseInt(captchaInput.value);
        if (isNaN(userAnswer) || userAnswer !== captchaResult) {
            captchaError.textContent = "Incorrect answer. Please try again.";
            captchaError.style.display = "block";
            return; // Stop form submission
        } else {
            captchaError.style.display = "none";
        }

        // Continue with AJAX submission
        const formData = new FormData(contactForm);

        fetch("https://smtpmailer.fazalmahmood.com/submit.php", {
            method: "POST",
            mode: "cors",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Server responded with status " + response.status);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("response").innerHTML = data;
            contactForm.reset();

            // Generate new CAPTCHA
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            captchaResult = num1 + num2;
            captchaQuestion.textContent = `What is ${num1} + ${num2}?`;
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("response").innerHTML = "Error: Please try again.";
        });
    });
});
