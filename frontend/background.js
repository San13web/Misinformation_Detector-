chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("📩 Received message:", message);

    // Handle request from popup.js to analyze misinformation
    if (message.query === "Analyze Misinformation") {
        console.log("✅ Processing misinformation check...");

        fetch("http://127.0.0.1:5000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: message.text })
        })
        .then(response => response.json())
        .then(data => {
            console.log("✅ API Response:", data);
            sendResponse(data); // ✅ Always send a response
            
            // Send the detected misinformation to content.js for highlighting
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { 
                    action: "highlightMisinformation", 
                    misinformation: data.misinformation 
                });
            });

        })
        .catch(error => {
            console.error("❌ API Fetch Error:", error);
            sendResponse({ error: "Failed to fetch data from backend." });
        });

        return true; // ✅ Keep the response channel open for async call
    }

    // Handle direct request from popup.js to highlight misinformation
    if (message.action === "highlightMisinformation") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { misinformationText: message.misinformation });
        });
    }

    sendResponse({ error: "Unknown request" });
    return true; // ✅ Keeps response channel open if needed
});
