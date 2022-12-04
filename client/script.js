let slidePosition = 0;

// gather a reference to every slide we're using via the class name and querySelectorAll
const slides = document.querySelectorAll(".carousel_item");

// change that "NodeList" into a Javascript "array", to get access to "array methods"
const slidesArray = Array.from(slides);

// Figure out how many slides we have available
const totalSlides = slidesArray.length;

function updateSlidePosition() {
  slidesArray.forEach((slide) => {
    slide.classList.remove("visible");
    slide.classList.add("hidden");
  });
  console.log(slidePosition);
  slides[slidePosition].classList.add("visible");
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition += 1;
  }
  updateSlidePosition(); // this is how you call a function within a function
}
function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition -= 1;
  }
  updateSlidePosition();
}

/*
  These two functions have been assigned via "addEventListener"
  to the elements accessed by the "querySelector" set to the class name on each
*/
document
  .querySelector(".next") // Get the appropriate element (<button class="next">)
  .addEventListener("click", () => {
    // set an event listener on it - when it's clicked, do this callback function
    console.log("clicked next"); // let's tell the client console we made it to this point in the script
    moveToNextSlide(); // call the function above to handle this
  });

document.querySelector(".prev").addEventListener("click", () => {
  moveToPrevSlide();
});

document.getElementById("search-btn").addEventListener("click", async (e) => {
  e.preventDefault();

  let season = document.getElementById("season-select").value;

  mainEvent(season);
});
async function mainEvent(season) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "788121d3a2msh37c568f9d110a05p1f092fjsn2fe64f26d082",
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
    },
  };

  const standings = await fetch(
    `https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=${season}`,
    options
  );
  const standings_response = await standings.json();
  document.getElementById("example").innerHTML = "";
  const divEl = document.getElementById("example");
  let westWin = [];
  let westLose = [];
  let eastWin = [];
  let eastLose = [];
  standings_response.response.map((team) => {
    if (team.conference.name == "west") {
      // objWest.y = objWest.y + Number(team.conference.win);
      westWin.push({
        label: team.team.name,
        y: team.conference.win,
      });
      westLose.push({
        label: team.team.name,
        y: team.conference.loss,
      });
    } else {
      eastWin.push({
        label: team.team.name,
        y: team.conference.win,
      });
      eastLose.push({
        label: team.team.name,
        y: team.conference.loss,
      });
    }

    addElements(team, divEl, team.team.logo);
  });

  drawChart(
    westWin,
    westLose,
    "chartContainer",
    "NBA West statics -Season: " + season
  );
  drawChart(
    eastWin,
    eastLose,
    "chartContainer2",
    "NBA East statics -Season: " + season
  );
}

const addElements = (element, parentElement, src) => {
  const divEl = document.createElement("div");
  divEl.classList.add("team-element");

  const headerEl = document.createElement("div");

  const imgEl = document.createElement("img");
  imgEl.src = src;
  imgEl.classList.add("logos");
  headerEl.appendChild(imgEl);
  const headerH1 = document.createElement("h1");
  headerH1.innerHTML = element.team.name;
  headerEl.appendChild(headerH1);
  headerEl.classList.add("header-teams");

  const divRow = document.createElement("div");

  const row1 = document.createElement("div");
  const leftEl1 = document.createElement("div");
  const rightEl1 = document.createElement("div");
  leftEl1.innerHTML = `conference:`;
  rightEl1.innerHTML = `${element.conference.name}`;
  row1.classList.add("row-element");
  row1.appendChild(leftEl1);
  row1.appendChild(rightEl1);

  const row2 = document.createElement("div");
  row2.classList.add("row-element");
  const leftEl2 = document.createElement("div");
  const rightEl2 = document.createElement("div");
  leftEl2.innerHTML = `rank:`;
  rightEl2.innerHTML = `${element.conference.rank}`;

  row2.appendChild(leftEl2);
  row2.appendChild(rightEl2);

  const row3 = document.createElement("div");
  row3.classList.add("row-element");
  const leftEl3 = document.createElement("div");
  const rightEl3 = document.createElement("div");
  leftEl3.innerHTML = `win:`;
  rightEl3.innerHTML = `${element.conference.win}`;

  row3.appendChild(leftEl3);
  row3.appendChild(rightEl3);

  const row4 = document.createElement("div");
  row4.classList.add("row-element");
  const leftEl4 = document.createElement("div");
  const rightEl4 = document.createElement("div");
  leftEl4.innerHTML = `loss:`;
  rightEl4.innerHTML = `${element.conference.loss}`;

  row4.appendChild(leftEl4);
  row4.appendChild(rightEl4);

  divRow.appendChild(row1);
  divRow.appendChild(row2);
  divRow.appendChild(row3);
  divRow.appendChild(row4);

  divEl.appendChild(headerEl);
  divEl.appendChild(divRow);
  parentElement.appendChild(divEl);
};

function drawChart(win, lose, container, title) {
  var chart = new CanvasJS.Chart(container, {
    theme: "light1", // "light2", "dark1", "dark2"
    animationEnabled: false, // change to true
    title: {
      text: title,
    },
    data: [
      {
        // Change type to "bar", "area", "spline", "pie",etc.
        type: "column",
        showInLegend: true,

        legendText: "win",
        dataPoints: win,
      },
      {
        // Change type to "bar", "area", "spline", "pie",etc.
        type: "column",
        showInLegend: true,

        legendText: "lose",
        dataPoints: lose,
      },
    ],
    axisX: {
      labelFontSize: 8,
    },
  });
  chart.render();
}

document.addEventListener("DOMContentLoaded", async () => mainEvent("2022")); // the async keyword means we can make API requests
