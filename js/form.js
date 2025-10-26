document.addEventListener("DOMContentLoaded", function() {

    const captchaInput = document.getElementById("captchaInput");
    const captchaError = document.getElementById("captchaError");
    const contactForm = document.getElementById("contactForm");

    // Generate CAPTCHA
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let captchaResult = num1 + num2;
    captchaInput.placeholder = `What is ${num1} + ${num2}?`;

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const userAnswer = parseInt(captchaInput.value);
        if (isNaN(userAnswer) || userAnswer !== captchaResult) {
            captchaError.textContent = "Incorrect answer. Please try again.";
            captchaError.style.display = "block";
            return;
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
        .then(response => response.ok ? response.text() : Promise.reject("Server error"))
        .then(data => {
            document.getElementById("response").innerHTML = data;
            contactForm.reset();

            // Generate new CAPTCHA
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            captchaResult = num1 + num2;
            captchaInput.placeholder = `What is ${num1} + ${num2}?`;
        })
        .catch(error => {
            console.error(error);
            document.getElementById("response").innerHTML = "Error: Please try again.";
        });
    });

});
