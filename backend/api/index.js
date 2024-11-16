const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

// Sample data for locations, languages, and movies
const LOCATIONS = [
    "Los Angeles, USA",
    "Chicago, USA",
    "Mumbai, India",
    "Bangalore, India",
    "Toronto, Canada",
    "Montreal, Canada",
    "Milan, Italy",
    "Florence, Italy",
    "Downtown Dubai, Dubai",
    "City Walk, Dubai",
    "Bangkok, Thailand",
];

const createSeats = (row, count) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `${row}${i + 1}`,
        row,
        number: i + 1,
        isAvailable: true,
        price: row === "A" || row === "B" ? 200 : 150,
    }));
};

// Showtimes data
const SHOW_TIMES = ["10:00", "13:00", "16:00", "19:00"].map((time, index) => ({
    id: `st${index + 1}`,
    time,
    availableSeats: [
        ...createSeats("A", 10),
        ...createSeats("B", 10),
        ...createSeats("C", 10),
    ],
}));

const MOVIES = [
    // Los Angeles, USA
    {
        id: "m1",
        title: "The Godfather",
        language: ["English", "Spanish"],
        theatres: [
            {
                id: "t1",
                name: "AMC Theatres",
                location: "Los Angeles, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t2",
                name: "Cinemark",
                location: "Los Angeles, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t3",
                name: "Regal Cinemas",
                location: "Los Angeles, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m2",
        title: "Inception",
        language: ["English", "Spanish"],
        theatres: [
            {
                id: "t4",
                name: "AMC Theatres",
                location: "Los Angeles, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t5",
                name: "Cinemark",
                location: "Los Angeles, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t6",
                name: "Regal Cinemas",
                location: "Los Angeles, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m3",
        title: "Interstellar",
        language: ["English", "Spanish"],
        theatres: [
            {
                id: "t7",
                name: "AMC Theatres",
                location: "Los Angeles, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t8",
                name: "Cinemark",
                location: "Los Angeles, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t9",
                name: "Regal Cinemas",
                location: "Los Angeles, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m4",
        title: "Avengers: Endgame",
        language: ["English", "Spanish"],
        theatres: [
            {
                id: "t10",
                name: "AMC Theatres",
                location: "Los Angeles, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t11",
                name: "Cinemark",
                location: "Los Angeles, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t12",
                name: "Regal Cinemas",
                location: "Los Angeles, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    // Chicago, USA
    {
        id: "m5",
        title: "The Godfather",
        language: ["English", "Spanish"],
        theatres: [
            {
                id: "t13",
                name: "AMC Theatres",
                location: "Chicago, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t14",
                name: "Cinemark",
                location: "Chicago, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t15",
                name: "Regal Cinemas",
                location: "Chicago, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m6",
        title: "Inception",
        language: ["English", "Spanish"],
        theatres: [
            {
                id: "t16",
                name: "AMC Theatres",
                location: "Chicago, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t17",
                name: "Cinemark",
                location: "Chicago, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t18",
                name: "Regal Cinemas",
                location: "Chicago, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m7",
        title: "Interstellar",
        language: ["English", "Spanish"],
        theatres: [
            {
                id: "t19",
                name: "AMC Theatres",
                location: "Chicago, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t20",
                name: "Cinemark",
                location: "Chicago, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t21",
                name: "Regal Cinemas",
                location: "Chicago, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m8",
        title: "Avengers: Endgame",
        language: ["English", "Spanish"],
        theatres: [
            {
                id: "t22",
                name: "AMC Theatres",
                location: "Chicago, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t23",
                name: "Cinemark",
                location: "Chicago, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t24",
                name: "Regal Cinemas",
                location: "Chicago, USA",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },

    // Mumbai, India
    {
        id: "m9",
        title: "3 Idiots",
        language: ["English", "Hindi", "Marathi"],
        theatres: [
            {
                id: "t25",
                name: "PVR Cinemas",
                location: "Mumbai, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t26",
                name: "INOX",
                location: "Mumbai, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t27",
                name: "Carnival Cinemas",
                location: "Mumbai, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m10",
        title: "Dangal",
        language: ["English", "Hindi", "Marathi"],
        theatres: [
            {
                id: "t28",
                name: "PVR Cinemas",
                location: "Mumbai, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t29",
                name: "INOX",
                location: "Mumbai, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t30",
                name: "Carnival Cinemas",
                location: "Mumbai, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m11",
        title: "Kabhi Khushi Kabhie Gham",
        language: ["English", "Hindi", "Marathi"],
        theatres: [
            {
                id: "t31",
                name: "PVR Cinemas",
                location: "Mumbai, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t32",
                name: "INOX",
                location: "Mumbai, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t33",
                name: "Carnival Cinemas",
                location: "Mumbai, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m12",
        title: "Sholay",
        language: ["English", "Hindi", "Kannada"],
        theatres: [
            {
                id: "t34",
                name: "PVR Cinemas",
                location: "Mumbai, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t35",
                name: "INOX",
                location: "Mumbai, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t36",
                name: "Carnival Cinemas",
                location: "Mumbai, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    // Banglore, India
    {
        id: "m13",
        title: "3 Idiots",
        language: ["English", "Hindi", "Marathi"],
        theatres: [
            {
                id: "t37",
                name: "PVR Cinemas",
                location: "Bangalore, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t38",
                name: "INOX",
                location: "Bangalore, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t39",
                name: "Carnival Cinemas",
                location: "Bangalore, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m14",
        title: "Dangal",
        language: ["English", "Hindi", "Marathi"],
        theatres: [
            {
                id: "t40",
                name: "PVR Cinemas",
                location: "Bangalore, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t41",
                name: "INOX",
                location: "Bangalore, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t42",
                name: "Carnival Cinemas",
                location: "Bangalore, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m15",
        title: "Kabhi Khushi Kabhie Gham",
        language: ["English", "Hindi", "Marathi"],
        theatres: [
            {
                id: "t43",
                name: "PVR Cinemas",
                location: "Bangalore, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t44",
                name: "INOX",
                location: "Bangalore, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t45",
                name: "Carnival Cinemas",
                location: "Bangalore, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m16",
        title: "Sholay",
        language: ["English", "Hindi", "Kannada"],
        theatres: [
            {
                id: "t46",
                name: "PVR Cinemas",
                location: "Bangalore, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t47",
                name: "INOX",
                location: "Bangalore, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t48",
                name: "Carnival Cinemas",
                location: "Bangalore, India",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },

    // Toronto, Canada
    {
        id: "m17",
        title: "The Godfather",
        language: ["English", "French"],
        theatres: [
            {
                id: "t49",
                name: "Scotiabank Theatre",
                location: "Toronto, Canada",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t50",
                name: "Cineplex Cinemas",
                location: "Toronto, Canada",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t51",
                name: "Landmark Cinemas",
                location: "Toronto, Canada",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m18",
        title: "Inception",
        language: ["English", "French"],
        theatres: [
            {
                id: "t52",
                name: "Scotiabank Theatre",
                location: "Toronto, Canada",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t53",
                name: "Cineplex Cinemas",
                location: "Toronto, Canada",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t54",
                name: "Landmark Cinemas",
                location: "Toronto, Canada",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },

    // Montreal, Canada
    {
        id: "m19",
        title: "The Godfather",
        language: ["English", "French"],
        theatres: [
            {
                id: "t55",
                name: "Scotiabank Theatre",
                location: "Montreal, Canada",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t56",
                name: "Cineplex Cinemas",
                location: "Montreal, Canada",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t57",
                name: "Landmark Cinemas",
                location: "Montreal, Canada",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m20",
        title: "Inception",
        language: ["English", "French"],
        theatres: [
            {
                id: "t58",
                name: "Scotiabank Theatre",
                location: "Montreal, Canada",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t59",
                name: "Cineplex Cinemas",
                location: "Montreal, Canada",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t60",
                name: "Landmark Cinemas",
                location: "Montreal, Canada",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },

    // Milan, Italy
    {
        id: "m21",
        title: "Interstellar",
        language: ["English", "Italian"],
        theatres: [
            {
                id: "t61",
                name: "Cinema Arcadia",
                location: "Milan, Italy",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t62",
                name: "The Space Cinema",
                location: "Milan, Italy",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t63",
                name: "Odeon Theatre",
                location: "Milan, Italy",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m22",
        title: "Avengers: Endgame",
        language: ["English", "Italian"],
        theatres: [
            {
                id: "t64",
                name: "Cinema Arcadia",
                location: "Milan, Italy",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t65",
                name: "The Space Cinema",
                location: "Milan, Italy",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t66",
                name: "Odeon Theatre",
                location: "Milan, Italy",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },

    // Florence, Italy
    {
        id: "m23",
        title: "Interstellar",
        language: ["English", "Italian"],
        theatres: [
            {
                id: "t67",
                name: "Cinema Arcadia",
                location: "Florence, Italy",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t68",
                name: "The Space Cinema",
                location: "Florence, Italy",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t69",
                name: "Odeon Theatre",
                location: "Florence, Italy",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m24",
        title: "Avengers: Endgame",
        language: ["English", "Italian"],
        theatres: [
            {
                id: "t70",
                name: "Cinema Arcadia",
                location: "Florence, Italy",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t71",
                name: "The Space Cinema",
                location: "Florence, Italy",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t72",
                name: "Odeon Theatre",
                location: "Florence, Italy",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },

    // Downtown Dubai, Dubai
    {
        id: "m25",
        title: "The Godfather",
        language: ["English", "Arabic"],
        theatres: [
            {
                id: "t73",
                name: "Reel Cinemas",
                location: "Downtown Dubai, Dubai",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t74",
                name: "VOX Cinemas",
                location: "Downtown Dubai, Dubai",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t75",
                name: "Novo Cinemas",
                location: "Downtown Dubai, Dubai",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m26",
        title: "Inception",
        language: ["English", "Arabic"],
        theatres: [
            {
                id: "t76",
                name: "Reel Cinemas",
                location: "Downtown Dubai, Dubai",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t77",
                name: "VOX Cinemas",
                location: "Downtown Dubai, Dubai",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t78",
                name: "Novo Cinemas",
                location: "Downtown Dubai, Dubai",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    // City Walk, Dubai
    {
        id: "m27",
        title: "The Godfather",
        language: ["English", "Arabic"],
        theatres: [
            {
                id: "t79",
                name: "Reel Cinemas",
                location: "City Walk, Dubai",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t80",
                name: "VOX Cinemas",
                location: "City Walk, Dubai",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t81",
                name: "Novo Cinemas",
                location: "City Walk, Dubai",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m28",
        title: "Inception",
        language: ["English", "Arabic"],
        theatres: [
            {
                id: "t82",
                name: "Reel Cinemas",
                location: "City Walk, Dubai",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t83",
                name: "VOX Cinemas",
                location: "City Walk, Dubai",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t84",
                name: "Novo Cinemas",
                location: "City Walk, Dubai",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    // Bangkok, Thailand
    {
        id: "m28",
        title: "Interstellar",
        language: ["English", "Thai"],
        theatres: [
            {
                id: "t85",
                name: "Major Cineplex",
                location: "Bangkok, Thailand",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t86",
                name: "SF World Cinema",
                location: "Bangkok, Thailand",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t87",
                name: "House Samyan",
                location: "Bangkok, Thailand",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
    {
        id: "m29",
        title: "Avengers: Endgame",
        language: ["English", "Thai"],
        theatres: [
            {
                id: "t88",
                name: "Major Cineplex",
                location: "Bangkok, Thailand",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t89",
                name: "SF World Cinema",
                location: "Bangkok, Thailand",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
            {
                id: "t90",
                name: "House Samyan",
                location: "Bangkok, Thailand",
                showTimes: JSON.parse(JSON.stringify(SHOW_TIMES)),
            },
        ],
    },
];

const BOOKINGS = new Map();

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Endpoints
app.get("/locations", (req, res) => {
    res.json({ locations: LOCATIONS });
});

app.get("/movies", (req, res) => {
    const { location } = req.query;
    const movies = MOVIES.filter((movie) =>
        movie.theatres.some((theatre) => theatre.location === location)
    );
    res.json({
        movies: movies.map((movie) => ({
            id: movie.id,
            title: movie.title,
            languages: movie.language,
        })),
    });
});

app.get("/movies/:movieId/theatres", (req, res) => {
    const movie = MOVIES.find((m) => m.id === req.params.movieId);
    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }
    res.json({ theatres: movie.theatres });
});

app.get("/movies/:movieId/theatres/:theatreId/showtimes", (req, res) => {
    const movie = MOVIES.find((m) => m.id === req.params.movieId);
    if (!movie) {
        return res.status(404).json({ error: "Movie not found" });
    }
    const theatre = movie.theatres.find((t) => t.id === req.params.theatreId);
    if (!theatre) {
        return res.status(404).json({ error: "Theatre not found" });
    }
    res.json({ showTimes: SHOW_TIMES });
});

app.post(
    "/bookings",
    asyncHandler(async (req, res) => {
        const { movieId, theatreId, showTimeId, seatIds } = req.body;
        const movie = MOVIES.find((m) => m.id === movieId);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        const theatre = movie.theatres.find((t) => t.id === theatreId);
        if (!theatre) {
            return res.status(404).json({ error: "Theatre not found" });
        }
        const showTime = SHOW_TIMES.find((st) => st.id === showTimeId);
        if (!showTime) {
            return res.status(404).json({ error: "Showtime not found" });
        }
        const bookedSeats = [];
        let totalAmount = 0;
        for (const seatId of seatIds) {
            const seat = showTime.availableSeats.find((s) => s.id === seatId);
            if (!seat || !seat.isAvailable) {
                return res
                    .status(400)
                    .json({ error: `Seat ${seatId} is not available` });
            }
            seat.isAvailable = false;
            bookedSeats.push(seat);
            totalAmount += seat.price;
        }
        const bookingId = `B${BOOKINGS.size + 1}`;
        const booking = {
            id: bookingId,
            movieTitle: movie.title,
            theatreName: theatre.name,
            showTime: showTime.time,
            seats: bookedSeats,
            totalAmount,
        };
        BOOKINGS.set(bookingId, booking);
        res.status(201).json(booking);
    })
);

app.get(
    "/available-seats",
    asyncHandler(async (req, res) => {
        const { movieTitle, theatreName, showTime } = req.query;

        if (!movieTitle || !theatreName || !showTime) {
            return res.status(400).json({
                error:
                    "Please provide movieTitle, theatreName, and showTime in query parameters",
            });
        }
        const showTimeData = SHOW_TIMES.find((st) => st.time === showTime);
        if (!showTimeData) {
            return res.status(404).json({ error: "Show time not found" });
        }

        const availableSeats = showTimeData.availableSeats.filter(
            (seat) => seat.isAvailable
        );
        res.json({ availableSeats });
    })
);

app.get(
    "/bookings/:bookingId",
    asyncHandler(async (req, res) => {
        const booking = BOOKINGS.get(req.params.bookingId);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.json(booking);
    })
);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});