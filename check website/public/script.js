

document.getElementById("urlForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var url = document.getElementById("url").value;

    console.log("Submitted URL:", url); // Debugging line

    // Show loading indicator
    document.getElementById("loading").style.display = "block";
    document.getElementById("results").innerHTML = "";

    fetch("/check", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response data:", data); // Debugging line
        displayResults(data);
        document.getElementById("loading").style.display = "none";
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById("loading").style.display = "none";
        document.getElementById("results").innerHTML = "<p>An error occurred. Please try again.</p>";
    });
});

function displayResults(data) {
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h2>Results:</h2>";
    resultsDiv.innerHTML += "<p>Is HTTPS: " + (data.isHttps ? "Yes" : "No") + "</p>";
    resultsDiv.innerHTML += "<p>Domain Valid: " + (data.domainValid ? "Yes" : "No") + "</p>";
    if (data.isHttps) {
        resultsDiv.innerHTML += "<p><strong>Website Secure: " + (data.certInfo ? "Yes" : "No") + "</strong></p>";
        resultsDiv.innerHTML += "<p>SSL Certificate Valid From: " + data.certInfo.validFrom + "</p>";
        resultsDiv.innerHTML += "<p>SSL Certificate Valid To: " + data.certInfo.validTo + "</p>";
        resultsDiv.innerHTML += "<p>SSL Certificate Issuer: " + data.certInfo.issuer + "</p>";
    } else {
        resultsDiv.innerHTML += "<p>SSL Certificate Info: N/A</p>";
    }
}
