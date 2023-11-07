const express = require("express");
const SocketServer = require("ws").Server;
const PORT = 8080;

const server = express().listen(PORT, () => {
  console.log(`listen on ${PORT}`);
});

// express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  // 對 message 設定監聽，接收從 client 發送的訊息
  ws.on("message", (data) => {
    // 取得所有連線中的 client
    let clients = wss.clients;
    // 發送訊息至每個 client
    clients.forEach((client) => {
      client.send(String(data));
    });
  });

  wss.on("close", () => {
    console.log("close connected");
  });
});
