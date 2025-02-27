document.addEventListener("DOMContentLoaded", function () {
    let checkButton = document.getElementById("checkButton");

    if (checkButton) {
        checkButton.addEventListener("click", async function () {
            let urlInput = document.getElementById("urlInput").value;
            
            if (!urlInput) {
                alert("⚠️ Please enter an article URL!");
                return;
            }

            // Show a loading message while fetching
            document.getElementById("result").innerHTML = "🔄 Checking... Please wait.";

            try {
                let response = await fetch("http://127.0.0.1:5000/analyze", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ url: urlInput }),
                });

                let data = await response.json();
                document.getElementById("result").innerHTML = `<strong>Credibility Score:</strong> ${data.score}% <br>
                                                               <strong>Analysis:</strong> ${data.misinformation}`;

                // Send result to content script for highlighting
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { misinformationText: data.misinformation });
                });

            } catch (error) {
                console.error("Error:", error);
                document.getElementById("result").innerHTML = "❌ Error: Unable to check misinformation. Please try again later.";
            }
        });
    }
});
