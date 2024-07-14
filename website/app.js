// Personal API Key for OpenWeatherMap API
const apiKey = "422d6ac728819c2e3c790a33501d1116&units=metric";

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */
function performAction(e) {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  const d = new Date();
  const newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

  getWeatherData(zip, apiKey)
    .then(function (data) {
      if (data) {
        // Check if data was fetched successfully
        // Add data to POST request
        return postData("/add", {
          date: newDate,
          temp: data.main.temp,
          content: feelings,
        });
      }
    })
    .then(function () {
      // Call updateUI to update browser content
      updateUI();
    });
}

/* Function to GET Web API Data */
const getWeatherData = async (zip, apiKey) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
    alert(
      "Unable to fetch weather data. Please check the ZIP code and try again."
    );
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to post data");
    }
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
    alert("Unable to save data. Please try again.");
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  try {
    const request = await fetch("/all");
    if (!request.ok) {
      throw new Error("Failed to fetch project data");
    }
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.content;
  } catch (error) {
    console.log("error", error);
    alert("Unable to update the UI. Please try again.");
  }
};
