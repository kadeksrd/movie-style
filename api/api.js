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
