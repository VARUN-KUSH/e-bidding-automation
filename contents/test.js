export {}
console.log("content script is up and running")

// Configuration for monitoring
const CHECK_INTERVAL = 2000 // Time between checks in milliseconds
let isMonitoring = false // Flag to control monitoring state
let monitoringInterval // Reference to the interval timer

// Function to handle actions with error logging


function findExpiry() {
  return new Promise((resolve, reject) => {
    const section = document.querySelector(
      'section[class="sapMPageEnableScrolling"]'
    );

    if (!section) {
      reject(new Error("Section element not found"));
      return;
    }

    console.log("section>>>>>>>>>>", section);

    const intervalId = setInterval(() => {
      const expiryButton = section.querySelector(
        ':scope > div[class="sapUiFixFlex"] > div:nth-child(1) > div[role="toolbar"] > div[role="heading"] > span'
      );

      if (expiryButton) {
        const text = expiryButton.innerText || "";
        console.log("expirybutton>>>>>", expiryButton);

        if (text.includes("Expires in")) {
          console.log("Expiry found:", text);
          clearInterval(intervalId);
          resolve(true); // Resolve promise when found
        }
      }
    }, 100);

    // Optional timeout to prevent infinite loop
    setTimeout(() => {
      clearInterval(intervalId);
      reject(new Error("Timeout waiting for expiry text"));
    }, 20000); // 10 seconds timeout
  });
}

async function pressSave() {
  try {
   
      const section = document.querySelector(
        'section[class="sapMPageEnableScrolling"]'
      )
      if (!section) throw new Error("Section element not found")
      console.log("section>>>>>>>>>>", section)
      const button = section.querySelector(
        ':scope > div[class="sapUiFixFlex"] > div:nth-child(1) > div[role="toolbar"] > button[aria-describedby="__text61"]'
      )
      console.log("savebutton>>>>>>>", button)
      if (!button) throw new Error("Inner button not found")
  
      if (button) {
        button.scrollIntoView({ behavior: "smooth", block: "center" })
        button.focus()
  
        button.dispatchEvent(
          new MouseEvent("mousedown", { bubbles: true, cancelable: true })
        )
        button.dispatchEvent(
          new MouseEvent("mouseup", { bubbles: true, cancelable: true })
        )
        button.dispatchEvent(
          new MouseEvent("click", { bubbles: true, cancelable: true })
        )
  
        console.log("Click event dispatched like Playwright")
        initiateSearchWithObserver()  
      
      }
    // innerDiv.click()
    console.log("Button clicked successfully!")
  } catch (error) {
    console.error("Error occurred:", error.message)
  }
}

// Enhanced function to check for bids with continuous monitoring
const isBidsAvailable = async() => {
  try {
    const section = document.querySelector(
      'section[class="sapMPageEnableScrolling"]'
    )
    if (!section) throw new Error("Section element not found")
    console.log("section>>>>>>>>", section)

    const innerDiv = section?.querySelector(
      ':scope > div[class="sapUiFixFlex"] > div:nth-child(2) > div[class="sapUiFixFlexFlexibleContainer"] > div > div[class="sapMScrollContScroll"] > div > div > div > table'
    )
    console.log("Checking for bids table...")
    console.log("innerdiv>>>>>>", innerDiv)

    const isbidvalueavail = innerDiv?.querySelector(
      'tbody > tr > td[colspan="26"]'
    )?.innerText
    console.log("isbidvalueavail", isbidvalueavail)
    if (isbidvalueavail == "No data") {
      console.log("No bids table found, initiating search...")
      clickSearch()
      return
    }
 
    console.log("Bids table found, processing bids...")
    
    const istrue = await findExpiry()
    if(istrue) {
    applyBid(innerDiv)
    }
    // Continue monitoring after processing
    // startNextMonitoringCycle()
  } catch (error) {
    console.error("Error checking bids availability:", error.message)
    // Continue monitoring even if an error occurs
    startNextMonitoringCycle()
  }
}

// Function to set up mutation observer and handle continuous monitoring
// const initiateSearchWithObserver = () => {
//   // Set up the mutation observer to watch for changes
//   const observer = new MutationObserver((mutations, obs) => {
//     const section = document.querySelector(
//       'section[class="sapMPageEnableScrolling"]'
//     )
//     if (!section) throw new Error("Section element not found")

//     const innerDiv = section?.querySelector(
//       ':scope > div[class="SapUiFixFlex"] > div:nth-child(2) > div[class="sapUiFixFlexibleContainer"] > div > div[class="sapMScrollContScroll"] > div > div > div > table'
//     )
//     console.log("Checking for bids table...")

//     const isbidvalueavail = innerDiv.querySelector(
//       'tbody > tr > td[colspan="26"]'
//     )?.innerText
//     if (isbidvalueavail !== "No data") {
//       console.log("Bid table found after DOM mutation")
//       obs.disconnect() // Stop observing once we find the table
//       applyBid(bidTable)
//       // Continue monitoring after processing
//       //   startNextMonitoringCycle()
//     }
//   })

//   // Start observing the entire document body for changes
//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//     attributes: true
//   })

//   // Click the search button to trigger content loading
//   // clickSearch()
// }

// Function to start the next monitoring cycle
const startNextMonitoringCycle = () => {
  if (isMonitoring) {
    setTimeout(() => {
      if (isMonitoring) {
        isBidsAvailable()
      }
    }, CHECK_INTERVAL)
  }
}

// Function to start monitoring
const startMonitoring = () => {
  // if (!isMonitoring) {
    console.log("Starting continuous bid monitoring...")
    // isMonitoring = true
    isBidsAvailable() // Start the first cycle
  // }
}

// Function to stop monitoring
const stopMonitoring = () => {
  console.log("Stopping bid monitoring...")
  // isMonitoring = false
  clearInterval(monitoringInterval)
}

const clickSearch = () => {
  try {
    const div = document.querySelector('div[id="__page0"]')
    if (!div) throw new Error("Page div not found")
    console.log("div>>>", div)
    const inside = div.querySelector(
      ':scope > header[class="sapMPageSubHeader"] > div[id="__toolbar0"]'
    )
    if (!inside) throw new Error("Toolbar div not found")
    console.log("inside>>>>>>>>>>", inside)
    const button = inside.querySelector(':scope > button[id="__button3"]')
    if (!button) throw new Error("Search button not found")
    console.log("button>>>>>>>>>", button)

    if (button) {
      button.scrollIntoView({ behavior: "smooth", block: "center" })
      button.focus()

      button.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true, cancelable: true })
      )
      button.dispatchEvent(
        new MouseEvent("mouseup", { bubbles: true, cancelable: true })
      )
      button.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true })
      )

      console.log("Click event dispatched like Playwright")
      initiateSearchWithObserver()
    }

    console.log("Search button clicked")
  } catch (error) {
    console.error("Error clicking search:", error.message)
    // Continue monitoring even if search fails
    startNextMonitoringCycle()
  }
}

function applyBid(bidtable) {
  try {
    const totalBidsinTable = bidtable.querySelectorAll("tbody > tr")
    totalBidsinTable.forEach((bid) => {
      const { price, inputfield } = getBidPrice(bid)
      if (price && inputfield) {
        applyCalculatedBid(price, inputfield)
        pressSave()
      }
    })
  } catch (error) {
    console.error("Error applying bids:", error.message)
  }
}

function getBidPrice(bid) {
  try {
    const originalPriceElement = bid.querySelector(
      'td[headers="__text24"] > span'
    )
    const inputField = bid.querySelector(
      'td[headers="__text25"] > div > div > input'
    )

    if (!originalPriceElement || !inputField) {
      throw new Error("Price elements not found")
    }

    const originalPrice = parseFloat(originalPriceElement.innerText)
    if (isNaN(originalPrice)) {
      throw new Error("Invalid original price")
    }

    const newPrice = originalPrice - 1
    return { price: newPrice, inputfield: inputField }
  } catch (error) {
    console.error("Error calculating bid price:", error.message)
    return { price: null, inputfield: null }
  }
}

const applyCalculatedBid = (price, inputfield) => {
  try {
    // Enable the input field if it's disabled
    if (inputfield.disabled) {
      inputfield.disabled = false
    }

    inputfield.value = price
    // Trigger change event to ensure the UI updates
    const event = new Event("change", { bubbles: true })
    inputfield.dispatchEvent(event)
  } catch (error) {
    console.error("Error applying calculated bid:", error.message)
  }
}

// Message listener for extension commands
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "triggerButtonClick") {
    console.log("Starting monitoring from extension trigger")
    startMonitoring()
    // pressSave()
    sendResponse({ status: "Monitoring started" })
  } else if (message.action === "stopMonitoring") {
    stopMonitoring()
    sendResponse({ status: "Monitoring stopped" })
  }
})
