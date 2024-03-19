"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Action = ({ title, url }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
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
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="py-5 px-10 flex gap-10 overflow-x-scroll overflow-y-hidden scrollside">
          {posts.map((item, i) => (
            <div>
              <Link href={`/movies/${item.id}`}>
                <img
                  className="w-[400px] mr-[300px] h-[170px]  rounded-2xl"
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
    </section>
  );
};

export default Action;
