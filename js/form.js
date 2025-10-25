document.addEventListener("DOMContentLoaded", function() {

    // Generate math CAPTCHA
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const captchaResult = num1 + num2;

    const captchaQuestion = document.getElementById("captchaQuestion");
    const captchaInput = document.getElementById("captchaInput");
    const captchaError = document.getElementById("captchaError");
    captchaQuestion.textContent = `What is ${num1} + ${num2}?`;

    // Handle form submission
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // CAPTCHA validation
        if (parseInt(captchaInput.value) !== captchaResult) {
            captchaError.textContent = "Incorrect answer. Please try again.";
            captchaError.style.display = "block";
            return; // Stop form submission
        } else {
            captchaError.style.display = "none";
        }

        // Continue with form submission
        var formData = new FormData(this);

        fetch("https://smtpmailer.fazalmahmood.com/submit.php", {
            method: "POST",
            mode: "cors", // Enable CORS
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
            // Optionally reset the form and CAPTCHA
            this.reset();
            const newNum1 = Math.floor(Math.random() * 10) + 1;
            const newNum2 = Math.floor(Math.random() * 10) + 1;
            captchaQuestion.textContent = `What is ${newNum1} + ${newNum2}?`;
            captchaInput.value = "";
            captchaResult = newNum1 + newNum2; // Update the CAPTCHA result
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("response").innerHTML = "Error: Please try again.";
        });
    });
});
