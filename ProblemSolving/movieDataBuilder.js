// ==================== PROVIDED MOCK APIs ====================
// These APIs are provided for the interview

// ==================== INTERVIEW QUESTIONS ====================

/*
PART 1: Basic API Call
- Call getMovieCollection() and return the result
- Expected output: { title: "My Collection", films: [...] }

PART 2: Add Celebrity Data  
- Enhance the films with celebrity information
- Call getCelebrityDetails()
- Transform each film to include:
  - actors: array of actor names (strings)
  - director: object with { name: "Director Name", id: directorId }

PART 3A: Add Movie Statistics
- Add movie statistics to each film
- Call getMovieStats()
- Add likes and awards properties to each film

PART 3B: Add Fun Facts
- Add fun facts based on movie popularity
- Call getFunFacts() with array of likes from movie stats
- Add funFacts property to each film
- Challenge: getFunFacts depends on movie stats.

FINAL EXPECTED OUTPUT:
{
  title: "My Collection",
  films: [
    {
      filmId: 1,
      title: "The Dark Knight",
      actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
      director: { name: "Christopher Nolan", id: 201 },
      likes: 756,
      awards: 3,
      funFacts: "⭐ Great audience appeal with 756 likes!"
    },
    // ... more films
  ]
}

*/

const getMovieCollection = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "My Collection",
        films: [
          {
            filmId: 1,
            title: "The Dark Knight",
            actorIds: [101, 102, 103],
            directorId: 201,
          },
          {
            filmId: 2,
            title: "Inception",
            actorIds: [101, 104, 105],
            directorId: 202,
          },
          {
            filmId: 3,
            title: "Interstellar",
            actorIds: [106, 107, 108],
            directorId: 202,
          },
          {
            filmId: 4,
            title: "The Matrix",
            actorIds: [109, 110, 111],
            directorId: 203,
          },
          {
            filmId: 5,
            title: "Pulp Fiction",
            actorIds: [112, 113, 114],
            directorId: 204,
          },
        ],
      });
    }, 1000);
  });
};

const getCelebrityDetails = (celebIds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const celebs = {
        101: { id: 101, name: "Christian Bale" },
        102: { id: 102, name: "Heath Ledger" },
        103: { id: 103, name: "Aaron Eckhart" },
        104: { id: 104, name: "Marion Cotillard" },
        105: { id: 105, name: "Tom Hardy" },
        106: { id: 106, name: "Matthew McConaughey" },
        107: { id: 107, name: "Anne Hathaway" },
        108: { id: 108, name: "Jessica Chastain" },
        109: { id: 109, name: "Keanu Reeves" },
        110: { id: 110, name: "Laurence Fishburne" },
        111: { id: 111, name: "Carrie-Anne Moss" },
        112: { id: 112, name: "John Travolta" },
        113: { id: 113, name: "Samuel L. Jackson" },
        114: { id: 114, name: "Uma Thurman" },
        201: { id: 201, name: "Christopher Nolan" },
        202: { id: 202, name: "Christopher Nolan" },
        203: { id: 203, name: "The Wachowskis" },
        204: { id: 204, name: "Quentin Tarantino" },
      };
      resolve(celebIds.map((id) => celebs[id]).filter(Boolean));
    }, 1000);
  });
};

const getMovieStats = (filmIds) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        filmIds.map((filmId) => ({
          likes: Math.floor(Math.random() * 1000) + 100,
          awards: Math.floor(Math.random() * 5) + 1,
        }))
      );
    }, 2000);
  });
};

const getFunFacts = (likesArray) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        likesArray.map((likes) => {
          if (likes > 800) return `🔥 Extremely popular with ${likes} likes!`;
          if (likes > 500)
            return `⭐ Great audience appeal with ${likes} likes!`;
          if (likes > 300) return `👍 Decent popularity with ${likes} likes!`;
          return `📈 Building audience with ${likes} likes!`;
        })
      );
    }, 1000);
  });
};

let results;

try {
  results = await getMovieCollection();
  if (results) {
    const filmsArray = results.films;
    for (let film of filmsArray) {
      const actorsArray = await getCelebrityDetails(film.actorIds);
      const director = await getCelebrityDetails(film.directorId);
      results = {
        ...results,
        films: results.films.map((item) => ({
          ...item,
          actorIds: actorsArray.map((it) => it.name),
        })),
      };
    }
  }
} catch (e) {}

console.log(results);
