import Related from "../components/Related";
import Button from "../Button";

const getData = async (slug) => {
  try {
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/movie/${slug}?api_key=48e41f6ee33e906a87bf9f5600912834`
    );

    if (movieRes.ok) {
      return movieRes.json();
    }
  } catch (error) {
    console.error("Failed to fetch movie data:", error);
  }

  try {
    const tvRes = await fetch(
      `https://api.themoviedb.org/3/tv/${slug}?api_key=48e41f6ee33e906a87bf9f5600912834`
    );

    if (tvRes.ok) {
      return tvRes.json();
    }
  } catch (error) {
    console.error("Failed to fetch TV show data:", error);
  }

  return null;
};

const BlogData = async ({ params }) => {
  const { slug } = params;

  const post = await getData(slug);

  return (
    <div className="pt-20 md:pt-16">
      <div className="relative">
        <img
          className="w-full"
          src={`${"https://image.tmdb.org/t/p/original" + post.backdrop_path}`}
          alt=""
        />
        <div className="hidden md:block bg-gradient-to-r from-[#000] to-transparent w-[50%] absolute top-0 h-full z-10"></div>
        <div className=" hidden md:block bg-gradient-to-t from-[#000] to-transparent w-full absolute bottom-[50%] md:bottom-[-0%] h-[20%] z-10"></div>
        <div className=" md:absolute top-[450px] md:top-[20%] lg:top-[30%] px-10 z-10 md:px-20 max-w-[800px]  mt-[50px]">
          <h1 className="py-3  text-4xl md:text-2xl lg:text-6xl font-bold">
            {post.title ? post.title : post.name}
          </h1>
          <p className="py-5 text-sm md:text-sm text-white">{post.overview}</p>
          <Button />
        </div>
      </div>

      <Related />
    </div>
  );
};
export default BlogData;
