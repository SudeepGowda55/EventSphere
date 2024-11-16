import { run } from "@xmtp/message-kit";

const base_url = "http://ethglobal-bangkok-production.up.railway.app";

let firstTime = false;

const userBookingData = {};

const resetUserBookingData = () => {
  userBookingData = {
    location: null,
    movie: null,
    language: null,
    theatre: null,
    showTime: null,
    seats: [],
  };
};

async function sendWelcomeMessage(context) {
  //   const welcomeMessage =
  //     "🎬 Welcome to MovieBot! 🎥\n\n" +
  //     "I will help you book your movie tickets step by step.\n\n" +
  //     "Let's get started with /locations to choose a location.";
  const welcomeMessage = `
╔════════════════════════════════╗
║   🎬 Welcome to MovieBot 🎥   ║
╚════════════════════════════════╝

Hey there! 👋 I'm your personal movie booking assistant.

🚀 Let's get started! 

📍 Type /locations to find theaters near you

===============================
      Ready when you are!
===============================`;
  await context.sendTo(welcomeMessage, [context.message.sender.address]);
}

const LOCATIONS = new Map();
async function listAvailableLocations(context) {
  const response = await fetch(`${base_url}/locations`);

  if (response.ok) {
    const data = await response.json();
    const locations = data.locations;
    if (locations.length > 0) {
      let locationMessage = `
╭──────────────────╮
│ 🌎 Select City   |
╰──────────────────╯

Available locations around the globe:
`;
      locations.forEach((location, index) => {
        const [city, country] = location.split(",").map((part) => part.trim());
        LOCATIONS.set(index + 1, location);
        locationMessage += `${index + 1}. 🏙️ ${city}, ${country}\n\n`;
      });
      locationMessage += `
───────────────────────
✨ Enter location number to proceed
`;
      await context.sendTo(locationMessage, [context.message.sender.address]);
    } else {
      await context.sendTo("No locations available. Please try again later.", [
        context.message.sender.address,
      ]);
    }
  } else {
    await context.sendTo("Error fetching locations. Please try again later.", [
      context.message.sender.address,
    ]);
  }
}

const MOVIES = new Map();
async function listAvailableMovies(context, message) {
  const locationIndex = parseInt(message);
  const location = LOCATIONS.get(locationIndex);
  console.log(location);

  if (!location) {
    await context.sendTo(
      "Invalid location selection. Please enter a valid number corresponding to a location.",
      [context.message.sender.address]
    );
    return;
  }

  userBookingData["location"] = location;
  console.log(userBookingData);

  const response = await fetch(`${base_url}/movies?location=${location}`);
  if (response.ok) {
    const data = await response.json();
    const movies = data.movies;

    if (movies.length > 0) {
      let moviesMessage = `
╔══════════════════════╗
   🎬 Now Showing in
   📍 ${location}
╚══════════════════════╝\n`;
      movies.forEach((movie, index) => {
        MOVIES.set(index + 1, movie);
        moviesMessage += `
${index + 1}. 🎥 ${movie.title}
   🗣️ Languages: ${movie.languages.map((lang) => `[${lang}]`).join(" ")}
   ─────────────────`;
      });
      moviesMessage += `

✨ How to book:
📝 Type: [movie number] [language]
💡 Example: "1 English"\n`;

      await context.sendTo(moviesMessage, [context.message.sender.address]);
    } else {
      delete userBookingData.location;
      await context.sendTo("No movies available in this location.", [
        context.message.sender.address,
      ]);
    }
  } else {
    await context.sendTo("Error fetching movies. Please try again later.", [
      context.message.sender.address,
    ]);
  }
}

const THEATRE = new Map();
async function listAvailableTheatres(context, message) {
  const movieDetails = message.trim().split(" ");
  const movie = movieDetails[0];
  const movieIndex = parseInt(movie);
  const language = movieDetails[1];

  if (!language) {
    await context.sendTo(
      "No Language Specified. Please enter a language in which u want to watch the movie in.",
      [context.message.sender.address]
    );
    return;
  }

  userBookingData["title"] = MOVIES.get(movieIndex)["title"];
  userBookingData["movieId"] = MOVIES.get(movieIndex)["id"];
  userBookingData["language"] = language;

  console.log(userBookingData);

  const response = await fetch(
    `${base_url}/movies/${
      MOVIES.get(movieIndex)["id"]
    }/theatres?language=${language}`
  );

  if (response.ok) {
    const data = await response.json();
    const theatres = data.theatres;

    if (theatres.length > 0) {
      let theatresMessage = `
╔════════════════════════╗
    🎬 ${userBookingData["title"]}
    🗣️ ${language}
╚════════════════════════╝

Available Theatres:`;
      theatres.forEach((theatre, index) => {
        THEATRE.set(index + 1, theatre);
        theatresMessage += `

${index + 1}. 🎭 ${theatre.name}
   ──────────────`;
      });
      theatresMessage += `

✨ Enter theatre number to proceed\n`;
      await context.sendTo(theatresMessage, [context.message.sender.address]);
    } else {
      delete userBookingData.title;
      delete userBookingData.movieId;
      delete userBookingData.language;
      await context.sendTo(
        "No theatres available for this movie in this language.",
        [context.message.sender.address]
      );
    }
  } else {
    await context.sendTo("Error fetching theatres. Please try again later.", [
      context.message.sender.address,
    ]);
  }
}

// Fetch and display showtimes for the selected theatre
async function listShowtimes(context, message) {
  const theatreNo = parseInt(message.trim());

  userBookingData["theatreId"] = THEATRE.get(theatreNo)["id"];
  userBookingData["theatre"] = THEATRE.get(theatreNo)["name"];
  console.log(userBookingData);

  const response = await fetch(
    `${base_url}/movies/${userBookingData["movieId"]}/theatres/${userBookingData["theatreId"]}/showtimes`
  );

  if (response.ok) {
    const data = await response.json();
    const showtimes = data.showTimes;

    if (showtimes.length > 0) {
      let showtimesMessage = `
╔═══════════════════════╗
    🎬 ${userBookingData.title}
    🏛️ ${userBookingData.theatre}
╚═══════════════════════╝

Today's Show Times:`;
      const morning = showtimes.filter((st) => {
        const hour = parseInt(st.time.split(":")[0]);
        return hour >= 6 && hour < 12;
      });

      const afternoon = showtimes.filter((st) => {
        const hour = parseInt(st.time.split(":")[0]);
        return hour >= 12 && hour < 16;
      });

      const evening = showtimes.filter((st) => {
        const hour = parseInt(st.time.split(":")[0]);
        return hour >= 16 && hour < 20;
      });

      const night = showtimes.filter((st) => {
        const hour = parseInt(st.time.split(":")[0]);
        return hour >= 20 || hour < 6;
      });
      if (morning.length > 0) {
        showtimesMessage += `\n\n🌅 Morning Shows:`;
        morning.forEach((showtime, index) => {
          showtimesMessage += `\n${index + 1}. ⏰ ${showtime.time}`;
        });
      }

      // Add afternoon shows
      if (afternoon.length > 0) {
        showtimesMessage += `\n\n☀️ Matinee Shows:`;
        afternoon.forEach((showtime, index) => {
          showtimesMessage += `\n${morning.length + index + 1}. ⏰ ${
            showtime.time
          }`;
        });
      }

      // Add evening shows
      if (evening.length > 0) {
        showtimesMessage += `\n\n🌆 Evening Shows:`;
        evening.forEach((showtime, index) => {
          showtimesMessage += `\n${
            morning.length + afternoon.length + index + 1
          }. ⏰ ${showtime.time}`;
        });
      }

      // Add night shows
      if (night.length > 0) {
        showtimesMessage += `\n\n🌙 Night Shows:`;
        night.forEach((showtime, index) => {
          showtimesMessage += `\n${
            morning.length + afternoon.length + evening.length + index + 1
          }. ⏰ ${showtime.time}`;
        });
      }
      showtimesMessage += `

✨ Enter show number to proceed\n`;
      await context.sendTo(showtimesMessage, [context.message.sender.address]);
    } else {
      await context.sendTo("No showtimes available for this theatre.", [
        context.message.sender.address,
      ]);
    }
  } else {
    delete userBookingData.theatreId;
    delete userBookingData.theatre;
    await context.sendTo("Error fetching showtimes. Please try again later.", [
      context.message.sender.address,
    ]);
  }
}

async function sendUnknownMessage(context) {
  const sendUnknownCommandMessage = `
  ╭─────────────────╮
  │  ❓ Oops!       │
  ╰─────────────────╯
  
  I didn't understand that command
  
  Try this:
  
  📍 /locations - Find theatres
  
  ✨ Let's get your booking back on track!`;

  await context.sendTo(sendUnknownCommandMessage, [
    context.message.sender.address,
  ]);
}

async function askAction(context) {
  const question = `
    What would you like to do?

continue - Continue from current stage
reset - Start a new booking
✨ Just type the above command`;

  await context.sendTo(question, [context.message.sender.address]);
}

run(async (context) => {
  const { content, sender } = context.message;
  const text = content.content.trim();
  const senderAddress = sender.address;

  if (!firstTime) {
    await sendWelcomeMessage(context);
    firstTime = true;
    return;
  }

  if (text == "/locations") {
    await listAvailableLocations(context);
  } else if (
    parseInt(text.split(" ")[0]) >= 1 &&
    parseInt(text.split(" ")[0]) <= 100
  ) {
    if (Object.keys(userBookingData).length == 0) {
      await listAvailableMovies(context, text);
    } else if (Object.keys(userBookingData).length == 1) {
      await listAvailableTheatres(context, text);
    } else if (Object.keys(userBookingData).length == 4) {
      await listShowtimes(context, text);
    } else if (Object.keys(userBookingData).length == 6) {
      await selectSeats(context, text);
    } else {
      await askAction(context);
    }
  } else if (text == "reset") {
    resetUserBookingData();
    await sendWelcomeMessage(context);
  } else {
    await sendUnknownMessage(context);
  }
});
