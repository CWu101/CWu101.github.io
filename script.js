const API_ENDPOINT = "https://api.openai.com/v1/engines/text-davinci-002/completions";

function fetchResponse() {
    const API_KEY = document.getElementById('apiInput').value;
    const userInput = document.getElementById('userInput').value;

    if (userInput === "") {
        return;
    }

    const headers = new Headers({
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    });

    const body = JSON.stringify({
        prompt: userInput,
        max_tokens: 50
    });

    fetch(API_ENDPOINT, {
        method: 'POST',
        headers: headers,
        body: body
    })
    .then(response => response.json())
    .then(data => {
        const ans = data.choices[0].text.trim();
        document.getElementById('response').innerText = ans;
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
