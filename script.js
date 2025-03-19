document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("copy-button").addEventListener("click", copyToClipboard);
});

function copyToClipboard() {
    const text = document.getElementById("add-input").innerText.trim();
    if (text) {
        navigator.clipboard.writeText(text)
            .then(() => console.log("Copied successfully!"))
            .catch(err => console.error("Failed to copy: ", err));
    } else {
        console.error("Nothing to copy!");
    }
}