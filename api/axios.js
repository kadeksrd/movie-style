import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjRkMzIwYWYyMzExOTlmYmU1ZGRjMjdmMTI5MDdkNiIsInN1YiI6IjYzM2ZjZGZhMDE0MzI1MDA4MmE1NjIzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.alIfITWTuF8Qm28Yc3PXw9_F_FUPZOe-1LB6T-dUzw4",
  },
});

export default instance;
