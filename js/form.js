document.addEventListener("DOMContentLoaded", function() {

    const captchaInput = document.getElementById("captchaInput");
    const captchaError = document.getElementById("captchaError");
    const contactForm = document.getElementById("contactForm");

    // Function to generate new CAPTCHA
    function generateCaptcha() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        captchaInput.dataset.result = num1 + num2; // store correct answer in data attribute
        captchaInput.placeholder = `What is ${num1} + ${num2}?`;
        captchaInput.value = ""; // clear previous answer
        captchaError.style.display = "none";
    }

    generateCaptcha(); // Generate initial CAPTCHA

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const userAnswer = parseInt(captchaInput.value);
        const correctAnswer = parseInt(captchaInput.dataset.result);

        if (isNaN(userAnswer) || userAnswer !== correctAnswer) {
            captchaError.textContent = "Incorrect answer. Please try again.";
            captchaError.style.display = "block";
            return; // Stop submission
        }

        captchaError.style.display = "none";

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
            generateCaptcha(); // Generate a new CAPTCHA after submission
        })
        .catch(error => {
            console.error(error);
            document.getElementById("response").innerHTML = "Error: Please try again.";
        });
    });

});
