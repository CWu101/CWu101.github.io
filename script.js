
function fetchResponse_xunfei() {
    document.getElementById('response').innerText = "讯飞思考中.";

    const app_id = "a9781853"
    const app_secret="MWNmMDlmYTY0ZTllNmI4NzM1OGU2YTFj"
    const api_key = "175a0acc6cf8aa44963ac60a3c1854af"
        // 创建一个WebSocket连接
    var socket = new WebSocket('wss://spark-api.xf-yun.com/v2.1/chat');

    // 打开WebSocket连接后，发送请求数据
    socket.onopen = function(event) {
        var requestData = {
            "header": {
                "app_id": app_id,
            },
            "parameter": {
                "chat": {
                    "domain": "generalv2",
                    "temperature": 0.5,
                    "max_tokens": 1024
                }
            },
            "payload": {

            }
        };
        
        socket.send(JSON.stringify(requestData));
    };
    // 接收到服务器响应后的处理
    socket.onmessage = function (event) {
        document.getElementById('response').innerText = event.data;
        console.log('Server response:', event.data);
    };

    // 关闭WebSocket连接
    socket.onclose = function(event) {
        console.log('WebSocket connection closed:', event.code);
    };

}


function fetchResponse() {
    const API_KEY = document.getElementById('apiInput').value;
    const userInput = document.getElementById('userInput').value;
    const API_ENDPOINT = "https://api.openai.com/v1/engines/text-davinci-003/completions";

    if (userInput === "") {
        return;
    }
    document.getElementById('response').innerText = "GPT思考中...";

    const headers = new Headers({
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
    });

    const body = JSON.stringify({
        prompt: userInput,
        max_tokens: 1024
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
        document.getElementById('response').innerText = "发生错误，请重试";
        console.error("Error:", error);
    });
}
