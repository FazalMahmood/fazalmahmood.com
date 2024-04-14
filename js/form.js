document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        var formData = new FormData(this);

        fetch("https://solutions.fazalmahmood.com/submit.php", {
            method: "POST",
            mode: "cors", // Add this line to enable CORS
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
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("response").innerHTML = "Error: Please try again.";
        });
    });
});
