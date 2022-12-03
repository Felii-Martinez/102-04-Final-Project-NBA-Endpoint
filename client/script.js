let slidePosition = 0;

// gather a reference to every slide we're using via the class name and querySelectorAll
const slides = document.querySelectorAll('.carousel_item');

// change that "NodeList" into a Javascript "array", to get access to "array methods"
const slidesArray = Array.from(slides);

// Figure out how many slides we have available
const totalSlides = slidesArray.length;

function updateSlidePosition() {
  slidesArray.forEach((slide) => {
    slide.classList.remove('visible');
    slide.classList.add('hidden');
  });
  console.log(slidePosition);
  slides[slidePosition].classList.add('visible');
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
  .querySelector('.next') // Get the appropriate element (<button class="next">)
  .addEventListener('click', () => {
    // set an event listener on it - when it's clicked, do this callback function
    console.log('clicked next'); // let's tell the client console we made it to this point in the script
    moveToNextSlide(); // call the function above to handle this
  });

document.querySelector('.prev').addEventListener('click', () => {
  console.log('clicked prev');
  moveToPrevSlide();
});

function injectHTML_Celtics(list) {
  console.log('fired injectHTML_Celtics');
  const target = document.querySelector('celtics_stat'); 
  target.innerHTML = '';
  const listEl = document.createElement('ul');
  target.appendChild(listEl);
  const el = document.createElement('li');
  const e2 = document.createElement('li');
  const e3 = document.createElement('li');
  const e4 = document.createElement('li');
  el.innerText = list[0].name;
  e2.innerText = list[1].rank;
  e3.innerText = list[2].win;
  e4.innerText = list[3].lose;
  listEl.appendChild(el);
  listEl.appendChild(e2);
  listEl.appendChild(e3);
  listEl.appendChild(e4);
}

function team_stats(list) {
  console.log('fired teasm_stats');
  let team_stats_array = [];
  for (let i = 0; i < list.length; i++){
    team_stats_array.push(list.conference.name);
    team_stats_array.push(list.conference.rank);
    team_stats_array.push(list.conference.win);
    team_stats_array.push(list.conference.lost);
  }
  return team_stats_array;
}

function celtic_stats(list){    //passing team_stats, celtic is represented by the first 4 index. 
                                // Every 4 index is a new team
  let celtic_stats_array = [];
  celtic_stats_array.push(list[0]);
  celtic_stats_array.push(list[1]);
  celtic_stats_array.push(list[2]);
  celtic_stats_array.push(list[3]);
  return celtic_stats_array;
}

async function mainEvent() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '788121d3a2msh37c568f9d110a05p1f092fjsn2fe64f26d082',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };

  const standings = await fetch('https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022', options);
  const standings_response = await standings.json();

  // This IF statement ensures we can't do anything if we don't have information yet
  if (standings_response.data?.length > 0) { // the question mark in this means "if this is set at all"
    const nba_teams_stats = team_stats(standings_response);
    console.log(nba_teams_stats);

    const celticRecord = celtic_stats(nba_teams_stats);
    console.log(celticRecord);

    injectHTML_Celtics(celticRecord);

    



  }


}

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
