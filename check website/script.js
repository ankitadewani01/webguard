// script.js
document.getElementById("urlForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var url = document.getElementById("url").value;
    fetch("/check", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function displayResults(data) {
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h2>Results:</h2>";
    resultsDiv.innerHTML += "<p>Is HTTPS: " + (data.isHttps ? "Yes" : "No") + "</p>";
    resultsDiv.innerHTML += "<p>Domain Age: " + (data.domainAgeInYears !== null ? data.domainAgeInYears + " years" : "N/A") + "</p>";
    resultsDiv.innerHTML += "<p>SSL Certificate Expiry: " + (data.sslExpiry ? data.sslExpiry : "N/A") + "</p>";
    resultsDiv.innerHTML += "<p>SSL Certificate Issuer: " + (data.sslIssuer ? data.sslIssuer : "N/A") + "</p>";
}
