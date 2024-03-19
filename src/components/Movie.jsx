"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { API_KEY } from "../constants/Constant";

const Movie = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setPosts(data.results);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="p-5">
        <h1 className="text-3xl font-bold">Originals</h1>
        <div className="py-5 px-10 flex gap-10 overflow-x-scroll overflow-y-hidden scrollside">
          {posts.map((item, i) => {
            return (
              <Link href={`/movies/${item.id}`}>
                <img
                  className="w-[200px] mr-[200px] h-[300px]  rounded-2xl"
                  src={`${
                    "https://image.tmdb.org/t/p/original" + item.poster_path
                  }`}
                  alt="movie image"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Movie;
