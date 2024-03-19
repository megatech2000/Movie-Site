"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Related = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [urlid, setUrlid] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const randomPage = Math.floor(Math.random() * 100) + 1;
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=48e41f6ee33e906a87bf9f5600912834&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${randomPage}&sort_by=popularity.desc`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setPosts(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-10">
      <div className="py-10">
        <h1 className="text-3xl font-bold">Watch More Movies</h1>
      </div>
      <div className="grid p-5 gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
    </div>
  );
};

export default Related;
