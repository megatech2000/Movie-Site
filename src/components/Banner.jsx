"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";

import Link from "next/link";
import { API_KEY } from "../constants/Constant";

const Banner = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
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
    <section className=" md:pt-18 p-0 md:p-10">
      <div className="p-8 pt-28 md:pt-18 object-cover  w-full">
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper w-full h-[500px] 2xl:h-[800px]"
        >
          {posts.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <Link href={`/movies/${item.id}`}>
                  <img
                    className="w-full h-full relative object-cover border-none rounded-2xl"
                    src={`${
                      "https://image.tmdb.org/t/p/original" + item.backdrop_path
                    }`}
                    alt="movie image"
                  />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
