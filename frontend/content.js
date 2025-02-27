// Function to highlight misinformation with glowing red box & tooltip
function highlightMisinformation(misinformationText) {
    let bodyHTML = document.body.innerHTML;
    let regex = new RegExp(`(${misinformationText})`, "gi");

    document.body.innerHTML = bodyHTML.replace(regex, `<span class="highlighted">$1<span class="tooltip">⚠️ Possible Misinformation</span></span>`);

    // Add CSS styles dynamically
    let style = document.createElement("style");
    style.innerHTML = `
        .highlighted {
            background: rgba(255, 0, 0, 0.3);
            color: white;
            padding: 2px 5px;
            border-radius: 3px;
            transition: all 0.3s ease-in-out;
        }
        .highlighted:hover {
            background: red;
        }
        .tooltip {
            visibility: hidden;
            position: absolute;
            background: black;
            color: white;
            padding: 5px;
            border-radius: 5px;
            font-size: 12px;
            transition: all 0.3s ease-in-out;
        }
        .highlighted:hover .tooltip {
            visibility: visible;
        }
    `;
    document.head.appendChild(style);
}
