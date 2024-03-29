"use client";

import { API_KEY } from "../../../constants/Constant";
import Link from "next/link";
import { useEffect, useState } from "react";

const movieData = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(true);

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
        setPosts((prevPosts) => [...prevPosts, ...data.results]);
        // Append new results to existing ones
        setLoading(false);
        console.log(data.results);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [page]); // Fetch data when page state changes

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <section className="pt-20 md:pt-16">
      <h1 className="text-white ml-10 text-4xl font-bold">All Movies</h1>
      <div className="grid p-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:p-10">
        {posts.map((item, i) => (
          <div className="w-full" key={i}>
            <Link href={`/movies/${item.id}`}>
              <img
                className="w-[400px] mr-[300px] h-auto rounded-xl"
                src={`${
                  "https://image.tmdb.org/t/p/original" + item.backdrop_path
                }`}
                alt="movie image"
              />
            </Link>
            <div className="text-white text-center pt-5">
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="flex justify-center my-5">
          <button
            onClick={loadMore}
            className="bg-[#fff] text-black px-6 py-2 rounded-full  hover:text-[#979494]"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};
export default movieData;
