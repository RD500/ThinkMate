import { marked } from "https://cdn.jsdelivr.net/npm/marked@13.0.3/lib/marked.esm.js";
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.es.mjs";

let session = null;
let history = [];

// Initialize the session
const initializeSession = async () => {
  const { available, defaultTemperature, defaultTopK, maxTopK } = await self.ai.languageModel.capabilities();
  if (available === "no") {
    alert("Prompt API is not supported in this browser.");
    return;
  }

  session = await self.ai.languageModel.create({
    temperature: parseFloat(document.getElementById("session-temperature").value || defaultTemperature),
    topK: parseInt(document.getElementById("session-top-k").value || defaultTopK, 10)
  });
};

// Monitor model download progress
const initializeSessionWithProgress = async () => {
  const { available, defaultTemperature, defaultTopK } = await self.ai.languageModel.capabilities();
  if (available === "no") {
    alert("Prompt API is not supported in this browser.");
    return;
  }

  session = await self.ai.languageModel.create({
    monitor(m) {
      m.addEventListener("downloadprogress", e => {
        console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
      });
    },
    temperature: parseFloat(document.getElementById("session-temperature").value || defaultTemperature),
    topK: parseInt(document.getElementById("session-top-k").value || defaultTopK, 10)
  });
};

// Generate Counter-Argument and store in history
const generateCounterArgument = async () => {
  const inputText = document.getElementById("inputText").value.trim();
  if (!inputText) return;

  try {
    if (!session) await initializeSessionWithProgress();
    const promptText = `Generate a counter-argument for: ${inputText}`;
    const stream = await session.promptStreaming(promptText);

    let response = "";
    let previousLength = 0;
    for await (const chunk of stream) {
      const newContent = chunk.slice(previousLength);
      previousLength = chunk.length;
      response += newContent;
      document.getElementById("outputText").innerHTML = DOMPurify.sanitize(marked.parse(response));
    }

    // Store prompt and response in history
    history.push({ prompt: inputText, response });
    updateSidebar();

  } catch (error) {
    document.getElementById("outputText").textContent = `Error: ${error.message}`;
  }
};

// Reset fields for new chat
const resetChat = () => {
  document.getElementById("inputText").value = "";
  document.getElementById("outputText").innerHTML = "Your generated counter-argument will appear here...";
  document.getElementById("session-temperature").value = "1.0";
  document.getElementById("session-top-k").value = "10";
};

// Update Sidebar with history
const updateSidebar = () => {
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  history.forEach((entry, index) => {
    const item = document.createElement("button");
    item.className = "list-group-item list-group-item-action";
    item.textContent = entry.prompt;
    item.onclick = () => displayPreviousResponse(index);
    historyList.appendChild(item);
  });
};

// Display previous response in output
const displayPreviousResponse = (index) => {
  const response = history[index].response;
  document.getElementById("outputText").innerHTML = DOMPurify.sanitize(marked.parse(response));
};

// Event listener for generating counter-argument
document.getElementById("generate-counter").addEventListener("click", generateCounterArgument);

// Event listener for new chat
document.getElementById("new-chat").addEventListener("click", resetChat);

// Initialize session with download progress tracking on page load
initializeSessionWithProgress();
