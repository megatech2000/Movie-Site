import Action from "../components/Action";
import Banner from "../components/Banner";
import Movie from "../components/Movie";
import { API_KEY } from "./../constants/Constant";

export default function Home() {
  return (
    <div>
      <div>
        <Banner />
        <Movie />
        <Action
          url={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`}
          title="Action"
        />
        <Action
          url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`}
          title="Top Rated"
        />
        <Action
          url={`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=2`}
          title="Now Playing"
        />
        <Action
          url={`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=4&sort_by=popularity.desc`}
          title="Adventure"
        />
        <Action
          url={`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=2`}
          title="Popular"
        />
        <Action
          url={`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=5&sort_by=popularity.desc`}
          title="Triller"
        />
        <Action
          url={`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`}
          title="Trending"
        />
        <Action
          url={`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=2&sort_by=popularity.desc`}
          title="Tv Shows"
        />
        <Action
          url={`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`}
          title="On Air"
        />
        <Action
          url={`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`}
          title="Up Coming"
        />
      </div>
    </div>
  );
}
