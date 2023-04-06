const CHAT_BUTTON_SIZE = 50,
  CHAT_BUTTON_RADIUS = 25,
  CHAT_BUTTON_BACKGROUND_COLOR = "black",
  scriptTag = document.currentScript;

let ICON_COLOR = "white";

const chatButton = document.createElement("div");
chatButton.setAttribute("id", "interview-now-bubble-button");
chatButton.style.position = "fixed";
chatButton.style.bottom = "20px";
chatButton.style.right = "20px";
chatButton.style.width = "50px";
chatButton.style.height = "50px";
chatButton.style.borderRadius = "25px";
chatButton.style.backgroundColor = "black";
chatButton.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2)";
chatButton.style.cursor = "pointer";
chatButton.style.zIndex = 999999999;
chatButton.style.transition = "all .2s ease-in-out";

chatButton.addEventListener("mouseenter", (t) => {
  chatButton.style.transform = "scale(1.05)";
});

chatButton.addEventListener("mouseleave", (t) => {
  chatButton.style.transform = "scale(1)";
});

const chatButtonIcon = document.createElement("div");
chatButtonIcon.style.display = "flex";
chatButtonIcon.style.alignItems = "center";
chatButtonIcon.style.justifyContent = "center";
chatButtonIcon.style.width = "100%";
chatButtonIcon.style.height = "100%";
chatButtonIcon.style.zIndex = 999999999;
chatButton.appendChild(chatButtonIcon);

chatButton.addEventListener("click", () => {
  if (chat.style.display === "none") {
    chat.style.display = "flex";
    chatButtonIcon.innerHTML = getChatButtonCloseIcon();
  } else {
    chat.style.display = "none";
    chatButtonIcon.innerHTML = getChatButtonIcon();
  }
});

const chat = document.createElement("div");
chat.setAttribute("id", "interview-now-bubble-window");
chat.style.position = "fixed";
chat.style.flexDirection = "column";
chat.style.justifyContent = "space-between";
chat.style.bottom = "80px";
chat.style.right = "20px";
chat.style.width = "85vw";
chat.style.height = "70vh";
chat.style.boxShadow = "rgba(150, 150, 150, 0.15) 0px 6px 24px 0px, rgba(150, 150, 150, 0.15) 0px 0px 0px 1px";
chat.style.display = "none";
chat.style.borderRadius = "10px";
chat.style.zIndex = 999999999;
chat.style.overflow = "hidden";
document.body.appendChild(chat);
chat.innerHTML = `<iframe
src="http://d6b3-181-4-97-194.ngrok.io"
width="100%"
height="100%"
frameborder="0"
></iframe>`;

const mediaQuery = window.matchMedia("(min-width: 550px)");

function handleChatWindowSizeChange(t) {
  if (t.matches) {
    chat.style.height = "600px";
    chat.style.width = "400px";
  }
}

mediaQuery.addEventListener("change", handleChatWindowSizeChange);
handleChatWindowSizeChange(mediaQuery);

const getChatButtonColor = async () => {
  chatButton.style.backgroundColor = "black";
  document.body.appendChild(chatButton);

  const textColor = getContrastingTextColor("black");
  console.log("iconColor", textColor);
  ICON_COLOR = textColor;
  chatButtonIcon.innerHTML = getChatButtonIcon();
};

function getChatButtonIcon() {
  return `
  <button style="
    background-color: #3b82f6;
    cursor: pointer;
    border: none;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-weight: bold;
    color: #ffffff;
    border-radius: 9999px;
    outline: none;
    transition-duration: 150ms;
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  " onmouseover="this.style.backgroundColor='#2563eb'" onmouseout="this.style.backgroundColor='#3b82f6'">
    Easy apply now!
  </button>`;
}

function getChatButtonCloseIcon() {
  return `
  <svg id="closeIcon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="black" width="24" height="24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
  `;
}

function getContrastingTextColor(color) {
  if (color.charAt(0) === "#") {
    color = color.substr(1);
  }
  return (
    (0.299 * parseInt(color.substr(0, 2), 16) +
      0.587 * parseInt(color.substr(2, 2), 16) +
      0.114 * parseInt(color.substr(4, 2), 16)) /
      255 >
    0.5
      ? "black"
      : "white"
  );
}

getChatButtonColor();
