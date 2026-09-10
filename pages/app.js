const statusLine = document.getElementById("statusLine");
const output = document.getElementById("jsonOutput");
const baseUrlInput = document.getElementById("baseUrl");
const nameInput = document.getElementById("nameInput");
const helloButton = document.getElementById("helloButton");
const endpointButtons = document.querySelectorAll("button[data-endpoint]");

function buildUrl(path) {
  const base = baseUrlInput.value.trim().replace(/\/$/, "");
  return `${base}${path}`;
}

function updateOutput(data) {
  output.textContent = JSON.stringify(data, null, 2);
}

function setStatus(message, isError = false) {
  statusLine.textContent = message;
  statusLine.classList.toggle("error", isError);
}

async function callApi(path) {
  const url = buildUrl(path);
  setStatus(`通信中: ${url}`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    updateOutput(data);
    setStatus(`完了: HTTP ${response.status} (${response.ok ? "成功" : "失敗"})`, !response.ok);
  } catch (error) {
    updateOutput({
      error: "network_error",
      message: "通信に失敗しました。URLやCORS設定を確認してください。",
      detail: String(error),
    });
    setStatus("通信エラーが発生しました。", true);
  }
}

endpointButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const endpoint = button.getAttribute("data-endpoint");
    callApi(endpoint);
  });
});

helloButton.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const endpoint = `/api/hello?name=${encodeURIComponent(name)}`;
  callApi(endpoint);
});
