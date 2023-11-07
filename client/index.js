const userName = document.querySelector("#userName");
const toChatroom = document.querySelector("#toChatroom");

toChatroom.addEventListener("click", () => {
  if (userName.value !== undefined) {
    toChatroom.querySelector(
      "a"
    ).href = `./chatroom.html?username=${userName.value}`;
  } else {
    toChatroom.querySelector("a").href = `./chatroom.html?username=訪客`;
  }
});
