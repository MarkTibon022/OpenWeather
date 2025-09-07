document.getElementById("Dark-Toggle").addEventListener("click", () => {
  if (document.body.classList.contains("dark")) {
    setTimeout(() => {
      document.body.classList.remove("dark");
    }, 300);
  } else {
    setTimeout(() => {
      document.body.classList.add("dark");
    }, 300);
  }
});

const APIkey = `7962bc6093824add6455d16e45e24939`;

async function GetWeather() {
  const SearchWeather = document.getElementById("search-weather").value.trim();

  if (!SearchWeather) {
    throw new Error("Not found city");
  }

  const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${SearchWeather}&limit=5&appid=${APIkey}&units=metric`;

  try {
    const response = await fetch(APIURL);

    if (!response) {
      throw new Error("City not found");
    }
    const data = await response.json();

    console.log(data);
    DisplayWeather(data);
  } catch (error) {
    console.error("failled data fetching", error);
  }
}

function DisplayWeather(weatheData) {
  const Condition = weatheData.weather[0].main;
  let ImageGenerate = ``;

  switch (Condition) {
    case "Clouds":
      ImageGenerate = `white-3d-clouds-cartoon-fluffy-clouds-icon-3d-render-illustration-free-png.png`;
      break;
    case "Rain":
      ImageGenerate = `clouds-with-rain-drop-3d-concept-free-png.png`;
      break;
    case "Clear":
      ImageGenerate = `./assets/image/3d-weather-icon-day-free-png.png`;
      break;
    case "Snow":
      ImageGenerate = `3d-icon-cloudy-snow-weather-forecast-illustration-concept-icon-render-free-png.png`;
      break;
    case "Thunderstorm":
      ImageGenerate = `3d-weather-icon-night-with-rain-free-png.png`;
      break;
    case "Drizzle":
      ImageGenerate = ``;
      break;
    case "Mist":
    case "Haze":
    case "Fog":
      ImageGenerate = ``;
      break;
    default:
      break;
  }

  console.log(weatheData.name);
  console.log(weatheData.weather[0].main);
  console.log(weatheData.weather[0].description);
  console.log(weatheData.weather[0]);

  document.getElementById("container-weather").innerHTML = `
              <h1
            class="mb-5 text-5xl font-semibold text-[#121212] dark:text-white"
          >
            ${weatheData.name}
          </h1>

          <div
            class=" lg:flex lg:justify-center bg-white dark:bg-[#1f1f1f] shadow-md rounded-lg p-5"
          >
            <div class="flex sm:items-center">
              <img
                class="sm:h-[300px] sm:w-[300px] w-[150px] h-[150px]"
                src="./assets/image/${ImageGenerate}"
                alt=""
              />

              <div
                class="flex flex-col justify-center items-center p-2 sm:hidden"
              >
                <div class="">
                  <p class="text-gray-400">Discription</p>
                  <p
                    class="text-1xl font-semibold text-[#121212] dark:text-white"
                  >
                    ${weatheData.weather[0].description}
                  </p>
                </div>
                <div class="">
                  <p class="text-gray-400">Temperature</p>
                  <p
                    class="text-3xl font-semibold text-[#121212] dark:text-white"
                  >
                    ${weatheData.main.temp}
                  </p>
                </div>
              </div>
              <div class="hidden sm:flex justify-center gap-3.5">
                <div class="">
                  <p class="text-gray-400">Discription</p>
                  <p
                    class="text-3xl font-semibold text-[#121212] dark:text-white"
                  >
                    ${weatheData.weather[0].description}
                  </p>
                </div>
                <div class="">
                  <p class="text-gray-400">TemperatureT</p>
                  <p
                    class="text-3xl font-semibold text-[#121212] dark:text-white"
                  >
                    ${weatheData.main.temp}
                  </p>
                </div>
              </div>
            </div>
          </div>
  `;
}

GetWeather();
