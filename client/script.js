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

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '788121d3a2msh37c568f9d110a05p1f092fjsn2fe64f26d082',
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
  }
};

fetch('https://api-nba-v1.p.rapidapi.com/players/statistics?season=2022', options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
