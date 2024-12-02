import React from "react";

function IndexPopup() {
  const handleButtonClick = () => {
    // First get the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Send message to the content script in the active tab
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "triggerButtonClick" },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error:", chrome.runtime.lastError);
            return;
          }
          console.log("Message sent to content script:", response?.status);
        }
      );
    });
  };

  return (
    <div
      style={{
        width: "300px",
        height: "200px",
        padding: "16px",
        borderRadius: "8px",
        gap:"20px",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", color: "#333", fontWeight: "bold", fontSize: "1.3em", textTransform: "uppercase" }}>
      Start Your Bidding Process 🔥🚀
      </h3>

      <button
  onClick={handleButtonClick}
  style={{
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s, transform 0.2s",
  }}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
>
  Start bid
</button>

    </div>
  );
}

export default IndexPopup;
