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
  // chatButton.style.width = "50px";
  // chatButton.style.height = "50px";
  // chatButton.style.borderRadius = "25px";
  // chatButton.style.backgroundColor = "black";
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
  chat.style.height = "60vh";
  // chat.style.backgroundColor = "black";
  // chat.style.boxShadow = "rgba(150, 150, 150, 0.15) 0px 6px 24px 0px, rgba(150, 150, 150, 0.15) 0px 0px 0px 1px";
  chat.style.display = "none";
  chat.style.borderRadius = "10px";
  chat.style.zIndex = 999999999;
  chat.style.overflow = "hidden";
  document.body.appendChild(chat);
  chat.innerHTML = `<iframe
src="https://interviewnow.netlify.app"
width="100%"
height="100%"
frameborder="0"
></iframe>`;

  const mediaQuery = window.matchMedia("(min-width: 550px)");

  function handleChatWindowSizeChange(t) {
    if (t.matches) {
      chat.style.height = "500px";
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
    <div style="position: relative; display: inline-block;" onmouseover="this.querySelector('button').style.backgroundColor='#1F2937'" onmouseout="this.querySelector('button').style.backgroundColor='#1F2937'">
  <button style="position: relative; z-index: 10; display: flex; align-items: center; justify-content: center; width: 9rem; height: 2.5rem; padding: 1rem 0.1rem 1rem;  font-weight: bold; color: #ffffff; background-color: #1F2937; border-radius: 0.5rem; outline: none; cursor: pointer; transition: background-color 0.3s; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);">
    <span style="font-family: Arial, Helvetica, sans-serif;">Submit profile!</span>
  </button>
  <span style="position: absolute; top: 0; left: 0; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; padding: 1px; animation: button-ping 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;">
    <span style="display: block; width: 9rem; height: 2.5rem; background-color: transparent; border: 1px solid rgba(75, 85, 99, 0.6); border-radius: 0.5rem;"></span>
  </span>
</div>`;
  }
  function getChatButtonCloseIcon() {
    return `
    <div style="position: relative; display: inline-block;" onmouseover="this.querySelector('button').style.backgroundColor='#1F2937'" onmouseout="this.querySelector('button').style.backgroundColor='#1F2937'">
  <button style="position: relative; z-index: 10; display: flex; align-items: center; justify-content: center; width: 9rem; height: 2.5rem; padding: 1rem 0.1rem 1rem;  font-weight: bold; color: #ffffff; background-color: #1F2937; border-radius: 0.5rem; outline: none; cursor: pointer; transition: background-color 0.3s; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);">
    <span style="font-family: Arial, Helvetica, sans-serif;">Close</span>
  </button>
  <span style="position: absolute; top: 0; left: 0; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; padding: 1px;">
    <span style="display: block; width: 9rem; height: 2.5rem; background-color: transparent; border: 1px solid rgba(75, 85, 99, 0.6); border-radius: 0.5rem;"></span>
  </span>
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

  addAnimationKeyframes()
  getChatButtonColor();