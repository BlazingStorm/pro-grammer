const API_KEY = 'AIzaSyC99Y2xhn8J0weF7VPMNhawViwJNwaMhXs'; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

async function getGeminiResponse(prompt) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content.parts[0].text;
        } else {
            return 'No response generated.';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'Error fetching response.';
    }
}

// Function to handle button click
function askGemini(textString) {
    const userInput = "Correct the grammatical errors given below. Don't change anything not based on grammatical error" + textString;
    const responseText = document.getElementById('add-input');

    if (userInput.trim() === '') {
        responseText.textContent = 'Please enter a question!';
        return;
    }

    responseText.textContent = 'Loading...';

    getGeminiResponse(userInput).then(response => {
        console.log(response);
        responseText.textContent = response;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("selectedText", (data) => {
        if (data.selectedText) {
            // document.getElementById("add-input").innerText = data.selectedText;
            askGemini(data.selectedText);
        }
    });
});
