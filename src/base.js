// Function to set app title
export function setAppTitle(title) {
  document.title = title || "Typeform Judging Scoreboard";
}

// Function to set app base url as preconnect link element
export function setAppBaseUrl(url) {
  const link = document.createElement("link");
  link.rel = "preconnect";
  link.href = url;
  document.head.appendChild(link);
}
