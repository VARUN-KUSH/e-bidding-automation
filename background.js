chrome.action.onClicked.addListener((tab) => {
    // Programmatically open the side panel with your HTML content
    console.log("icon got clicked")
    chrome.sidePanel
      .setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error))
})