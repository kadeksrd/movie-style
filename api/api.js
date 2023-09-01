// const requests = {
//     fetchTrending: `/trending/all/week?7api_key=${API_KEY}&Language=en-US`,
//     fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
//     fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&Language=en-US`,
//     fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
//     fetchConedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
//     fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
//     fetchRonanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
//     fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
//   };

const request = {
  trending: `/trending/all/day?language=en-US`,
  hero: `movie/popular?language=en-US&page=3`,
  popularMovie: `/trending/movie/day?language=en-US&page=1`,
  popularSeries: `/trending/tv/day?original_language=en`,
  action: `/discover/movie?with_genres=28`,
  romance: `/discover/movie?with_genres=10749`,
  horror: `/discover/movie?with_genres=27`,
  documentaries: `/discover/movie?with_genres=99`,
  comedy: `/discover/movie?with_genres=35`,
};

export default request;
