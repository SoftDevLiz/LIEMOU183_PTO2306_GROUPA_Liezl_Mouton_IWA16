// scripts.js

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const data = {
  response: {
    requestType: "FETCH_ATHLETE_DATA",
    requestBy: "ALL_MATCHING_ATHLETES",
    forDisplay: "BEST_RACES",
    data: {
      NM372: {
        firstName: "Nwabisa",
        surname: "Masiko",
        id: "NM372",
        races: [
          {
            date: "2022-11-18T20:00:00.000Z",
            time: [9, 7, 8, 6],
          },
          {
            date: "2022-12-02T20:00:00.000Z",
            time: [6, 7, 8, 7],
          },
        ],
      },

      SV782: {
        firstName: "Schalk",
        surname: "Venter",
        id: "SV782",
        races: [
          {
            date: "2022-11-18T20:00:00.000Z",
            time: [10, 8, 3, 12],
          },
          {
            date: "2022-11-25T20:00:00.000Z",
            time: [6, 8, 9, 11],
          },
          {
            date: "2022-12-02T20:00:00.000Z",
            time: [10, 11, 4, 8],
          },
          {
            date: "2022-12-09T20:00:00.000Z",
            time: [9, 8, 9, 11],
          },
        ],
      },
    },
  },
};

// Only edit below this comment

const createHtml = (athlete) => {
  // Destructure data object into usable variables
  const id = athlete.id;
  const firstName = athlete.firstName;
  const surname = athlete.surname;
  const races = athlete.races;

  // Extract latest race (Why does .at(-1) not work?)
  const latestRace = races[races.length - 1];

  // Creating a DocumentFragment
  const fragment = document.createDocumentFragment();

  // Creating the <h2> element to be used -- Added in quotation marks because JS expects a string to match the HTML element exactly
  const title = document.createElement("h2");

  // Change the text content of <h2> to the ID of the athlete
  title.textContent = `${id}`;

  // Append the h2 title to the created DocumentFragment
  fragment.appendChild(title);

  // Creating <dl> to be used -- Added in quotation marks because JS expects a string to match the HTML element exactly
  const list = document.createElement("dl");

  // Extracts a usable date from the latest race's date
  const date = new Date(latestRace.date);

  // Extracts day of the month from given date
  const day = date.getDate();

  // Extract the month from the MONTHS array at the location of the number of whatever the month is
  const month = MONTHS[date.getMonth()];

  // Extracts the year from the given date
  const year = date.getFullYear();

  // Access the lap time arrays so that we can calculate the total race time
  const lapTime = latestRace.time;

  // Adds together lap times to get total race time
  const totalRaceTime = lapTime[0] + lapTime[1] + lapTime[2] + lapTime[3];

  // Divide the totalRaceTime (minutes) by 60 so that we get the hours, round it down
  const hours = Math.floor(totalRaceTime / 60);

  // Divide the remainder... I don't understand what this is doing
  const minutes = totalRaceTime % 60;

  /* Pass the following into the created description list...
    1. I have separated the interpolations and added space between them
    2. Used .length so that it displays the length of the races array.
    3. Added in a : so that hours and minutes display correctly
    */
  list.innerHTML = `
      <dt>Athlete:</dt> 
      <dd>${firstName} ${surname}</dd>

      <dt>Total Races:</dt>
      <dd>${races.length}</dd>

      <dt>Event Date (Latest):</dt>
      <dd>${day} ${month} ${year}</dd>

      <dt>Total Time (Latest):</dt>
      <dd>${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}</dd>
    `;

  // Append the list to the DocumentFragment
  fragment.appendChild(list);

  // Return the fragment so the function returns something we can actually use
  return fragment;
};

// Access the athlete ID's and create variables that matches the keys so that we can pass something to the function parameter
const NM372 = data.response.data.NM372;
const SV782 = data.response.data.SV782;

// Fixed the querySelector parameter
document.querySelector('[data-athlete="NM372"]').appendChild(createHtml(NM372));
document.querySelector('[data-athlete="SV782"]').appendChild(createHtml(SV782));
