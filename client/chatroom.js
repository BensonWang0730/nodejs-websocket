//  WebSocket 是瀏覽器的原生 Web API，所以不用 import
//使用 WebSocket 的網址向 Server 開啟連結
let ws = new WebSocket("ws://localhost:8080");

const urlParams = new URLSearchParams(window.location.search);
let userName = urlParams.get("username");
let msgList = [];
let chatBox = document.getElementById("chatbox");

//開啟後執行的動作，指定一個 function 會在連結 WebSocket 後執行
ws.onopen = () => {
  console.log("open connection");
  ws.send(
    JSON.stringify({
      userName,
      event: "login",
    })
  );
};

// 接收 Server 發送的訊息，傳遞的資料會在 event.data
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  // 有其他用戶進入的消息
  if (data.event === "login") {
    msgList.push({
      content: `歡迎${data.userName}進入~`,
    });
    chatBox.innerHTML += `<li>${msgList[msgList.length - 1].content}</li>`;
  }
};
//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
  console.log("close connection");
};
