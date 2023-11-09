//WebSocket 是瀏覽器的原生 Web API，所以不用 import
//使用 WebSocket 的網址向 Server 開啟連結
let ws = new WebSocket("ws://localhost:8080");
const urlParams = new URLSearchParams(window.location.search);

let userName = urlParams.get("username") || "訪客"; // 取得 params
let msgList = [];

const chatBox = document.getElementById("chatbox");
const inputMsg = document.getElementById("inputMsg");
const sendMsg = document.getElementById("sendMsg");

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
  } else if (data.event === "logout") {
    msgList.push({
      content: `${data.userName}離開`,
    });
  } else {
    if (userName === data.userName) {
      msgList.push({
        userName: data.userName,
        self: true,
        content: data.content,
      });
      chatBox.innerHTML += `<li class=right>${
        msgList[msgList.length - 1].content
      }</li>`;

      return;
    }
    msgList.push({
      userName: data.userName,
      self: false, // 判斷訊息是不是自己發的
      content: data.content,
    });
    chatBox.innerHTML += `<li>${msgList[msgList.length - 1].content}</li>`;
  }
};

//關閉後執行的動作，指定一個 function 會在連結中斷後執行
ws.onclose = () => {
  console.log("close connection");
};

//用戶發送消息
sendMsg.addEventListener("click", () => {
  if (!inputMsg.value.trim().length) {
    return alert("請發言後送出");
  }
  ws.send(
    JSON.stringify({
      userName,
      content: inputMsg.value,
    })
  );

  console.log(inputMsg.value);

  inputMsg.value = "";
});
