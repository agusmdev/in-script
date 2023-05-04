const CHAT_BUTTON_SIZE = 50,
CHAT_BUTTON_RADIUS = 25,
CHAT_BUTTON_BACKGROUND_COLOR = "black",
scriptTag = document.currentScript;
const userId = scriptTag.getAttribute("userId")


let ICON_COLOR = "white";

function createElements() {

const chatButton = document.createElement("div");
chatButton.setAttribute("id", "interview-now-bubble-button");
chatButton.style.position = "fixed";
// chatButton.style.bottom = "20px";
chatButton.style.bottom = "550px";
chatButton.style.left = "20px";
// chatButton.style.width = "50px";
// chatButton.style.height = "50px";
// chatButton.style.borderRadius = "25px";
// chatButton.style.backgroundColor = "black";
// chatButton.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2)";
chatButton.style.cursor = "pointer";
chatButton.style.zIndex = 999999999;
chatButton.style.transition = "all .2s ease-in-out";
// chatButton.style.background = "red";

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
    chatButtonIcon.innerHTML = getChatButtonIcon();
  } else {
    chat.style.display = "none";
    chatButtonIcon.innerHTML = ""
    // chatButtonIcon.innerHTML = getChatButtonIcon();
  }
});

const chat = document.createElement("div");
chat.setAttribute("id", "interview-now-bubble-window");
chat.style.position = "fixed";
chat.style.bottom = "10px";
chat.style.left = "20px";
// chat.style.width = "85vw";
// chat.style.height = "2000px";
// chat.style.backgroundColor = "red";
chat.style.boxShadow = "0 1px 14px 1px rgba(0,0,0,0.1)"
chat.style.display = "flex";
chat.style.borderRadius = "10px";
chat.style.zIndex = 999999999;
// chat.style.overflow = "visible";
// chat.style.overflow = "hidden";
document.body.appendChild(chat);
chat.innerHTML = `<iframe
src="https://interviewnow.netlify.app?userId=${userId}"
width="100%"
height="100%"
frameborder="0"
></iframe>`;


const mediaQuery = window.matchMedia("(min-width: 550px)");

function handleChatWindowSizeChange(t) {
  if (t.matches) {
    chat.style.height = "550px";
    // chat.style.height = "500px";
    chat.style.width = "400px";
  }
}

mediaQuery.addEventListener("change", handleChatWindowSizeChange);
handleChatWindowSizeChange(mediaQuery);

const getChatButtonColor = async () => {
  // chatButton.style.backgroundColor = "black";
  document.body.appendChild(chatButton);

  const textColor = getContrastingTextColor("black");
  ICON_COLOR = textColor;
  chatButtonIcon.innerHTML = getChatButtonIcon();
};

function addAnimationKeyframes() {
  const style = document.createElement('style');
  style.innerHTML = `
@keyframes button-ping {
0% {
transform: scale(0.75);
box-shadow: 0 0 0 0 rgba(0,0,0, 0.5);
}
70% {
transform: scale(.95);
box-shadow: 0 0 0 10px rgba(0,0,0, 0);
}
100% {
transform: scale(0.75);
box-shadow: 0 0 0 0 rgba(0,0,0, 0);
}
}
`;
  document.head.appendChild(style);
}

function getChatButtonIcon() {
  return `
<div style="position: relative; display: inline-block;" >
<div style="position: relative; z-index: 10; display: flex; align-items: center; justify-content: center; width: fit-content; height: 0.5rem; padding: 1rem 1.5rem; margin: 0 30px; font-weight: 200; color: #0f0f0f; background-color: #fff; border-radius: 0.5rem 0.5rem 0 0 ; outline: none; cursor: pointer; ">
<span style="font-family: Arial, Helvetica, sans-serif;">Close</span>
</div>
</div>`;
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

getChatButtonColor()
addAnimationKeyframes()

}

function enabledPaths() {
// Make a request to the endpoint to get the enabled paths
fetch(`https://n252jrjdnyzkxkxecnbmnhveme0sjlqi.lambda-url.us-east-1.on.aws/users/${userId}/paths`)
  .then(response => response.json())
  .then(data => {
    // Extract the enabled paths from the response data
    const paths = data.enabled_paths.map(e => e.toLowerCase())
    // const paths = ["*"]
    // Get the current URL of the page
    const currentUrl = window.location.href.toLowerCase();

    // Check if the current URL is in the list of enabled domain paths
    const bubbleButton = document.getElementById("interview-now-bubble-button")
    const bubbleWindow = document.getElementById("interview-now-bubble-window")
    if (paths.some(url => url.startsWith(currentUrl.slice(0, -1))) || paths.includes("*")) {
      // Get the iframe element
      createElements()
    }
    else {
      bubbleButton.remove()
      bubbleWindow.remove()

    }
  })
  .catch(error => console.error("Error fetching enabled paths:", error));
}

let lastUrl = window.location.href;
let intervalRefresh = null

function checkUrlChange() {
const currentUrl = window.location.href;

if (currentUrl !== lastUrl) {
  enabledPaths()
  lastUrl = currentUrl;
}
}

// Execute checkUrlChange every 500ms
if (!intervalRefresh) {
intervalRefresh = setInterval(checkUrlChange, 500);
}

enabledPaths()