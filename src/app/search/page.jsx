"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { API_KEY } from "../../constants/Constant";

const SearchPage = () => {
  const [posts, setPosts] = useState([]);
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1); // Starting from page 1
  const [loading, setLoading] = useState(true);
  const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setPosts(data.results);
        setRecords(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const filter = (event) => {
    const searchText = event.target.value;
    const filteredRecords = posts.filter((record) =>
      record.title.includes(searchText)
    );
    setRecords(filteredRecords);
  };

  const showRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * posts.length);
    setRandomMovie(posts[randomIndex]);
  };

  return (
    <section className="pt-20 md:pt-20">
      <div>
        <div className="px-10 lg:px-20 xl:px-24 flex flex-col items-center justify-between sm:flex-row ">
          <input
            className="w-full sm:w-[70%] lg:w-[80%] md:w-[70%] py-3 rounded-lg bg-[#636161] text-white outline-none"
            type="text"
            placeholder="Search..."
            onChange={filter}
          />
          {loading && <p>Loading...</p>}
          {!loading && (
            <div className="flex justify-center my-5">
              <button
                onClick={loadMore}
                className="bg-[#fff] text-black px-5 py-3 rounded-full  hover:text-[#979494]"
              >
                Refresh for More
              </button>
            </div>
          )}
        </div>
      </div>
      {randomMovie && (
        <div>
          <h2>Random Movie</h2>
          <div>
            <h3>{randomMovie.title}</h3>
            <img
              src={`https://image.tmdb.org/t/p/original${randomMovie.poster_path}`}
              alt={randomMovie.title}
            />
            <p>{randomMovie.overview}</p>
          </div>
        </div>
      )}

      <div className="grid p-14 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:p-10">
        {records.map((item, i) => (
          <div className="w-full" key={i}>
            <Link href={`/movies/${item.id}`}>
              <img
                className="w-[400px] mr-[300px] h-auto rounded-xl"
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt="movie image"
              />
            </Link>
            <div className="text-white text-center pt-5">
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchPage;
