const CHAT_BUTTON_SIZE = 50,
CHAT_BUTTON_RADIUS = 25,
CHAT_BUTTON_BACKGROUND_COLOR = "black",
scriptTag = document.currentScript;
const userId = scriptTag.getAttribute("userId")
let removedScript = false

let ICON_COLOR = "white";

const closeButton = document.createElement("div");
closeButton.setAttribute("id", "candidate-now-close-button");
closeButton.style.position = "fixed";
// closeButton.style.bottom = "20px";
closeButton.style.bottom = "550px";
closeButton.style.left = "20px";
// closeButton.style.width = "50px";
// closeButton.style.height = "50px";
// closeButton.style.borderRadius = "25px";
// closeButton.style.backgroundColor = "black";
// closeButton.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2)";
closeButton.style.cursor = "pointer";
closeButton.style.zIndex = 999999999;
closeButton.style.transition = "all .2s ease-in-out";
// closeButton.style.background = "red";

closeButton.addEventListener("mouseenter", (t) => {
closeButton.style.transform = "scale(1.05)";
});

closeButton.addEventListener("mouseleave", (t) => {
closeButton.style.transform = "scale(1)";
});

const closeButtonIcon = document.createElement("div");
// closeButtonIcon.style.display = "flex";
closeButtonIcon.style.display = "none";
closeButtonIcon.style.alignItems = "center";
closeButtonIcon.style.justifyContent = "center";
closeButtonIcon.style.width = "100%";
closeButtonIcon.style.height = "100%";
closeButtonIcon.style.zIndex = 999999999;
closeButton.appendChild(closeButtonIcon);

closeButton.addEventListener("click", () => {
  removedScript = true
  widgetForm.style.display = "none";
  closeButtonIcon.style.display = "none";
  // closeButtonIcon.innerHTML = ""
  // widgetForm.innerHTML = ""
});

const widgetForm = document.createElement("div");
widgetForm.setAttribute("id", "candidate-now-widget");
widgetForm.style.position = "fixed";
widgetForm.style.bottom = "10px";
widgetForm.style.left = "20px";
// widgetForm.style.width = "85vw";
// widgetForm.style.height = "2000px";
// widgetForm.style.backgroundColor = "red";
widgetForm.style.boxShadow = "0 15px 14px 1px rgba(0,0,0,0.1)"
widgetForm.style.display = "none"
// widgetForm.style.display = "flex";
widgetForm.style.borderRadius = "10px";
widgetForm.style.zIndex = 999999999;
// widgetForm.style.overflow = "visible";
// widgetForm.style.overflow = "hidden";
document.body.appendChild(widgetForm);
widgetForm.innerHTML = `<iframe
src="https://interviewnow.netlify.app?userId=${userId}"
width="100%"
height="100%"
frameborder="0"
></iframe>`;


const mediaQuery = window.matchMedia("(min-width: 550px)");

function handleChatWindowSizeChange(t) {
if (t.matches) {
  widgetForm.style.height = "550px";
  // widgetForm.style.height = "500px";
  widgetForm.style.width = "400px";
}
}

mediaQuery.addEventListener("change", handleChatWindowSizeChange);
handleChatWindowSizeChange(mediaQuery);

const getCloseButtonColor = async () => {
// closeButton.style.backgroundColor = "black";
document.body.appendChild(closeButton);

const textColor = getContrastingTextColor("black");
ICON_COLOR = textColor;
closeButtonIcon.innerHTML = getCloseButtonIcon();
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

function getCloseButtonIcon() {
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

getCloseButtonColor()
addAnimationKeyframes()

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
    // const bubbleButton = document.getElementById("candidate-now-close-button")
    // const bubbleWindow = document.getElementById("candidate-now-widget")
    const enabledSize = window.screen.width > 700

    if (!removedScript && enabledSize && (paths.some(url => url.startsWith(currentUrl.slice(0, -1))) || paths.includes("*"))) {
      // Get the iframe element
      widgetForm.style.display = "flex";
      closeButtonIcon.style.display = "flex";

    }
    else {
      widgetForm.style.display = "none";
      closeButtonIcon.style.display = "none";

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