import React from "react";

export { Page };

function Page(pageProps: any) {
  console.log('star-wars page rendered')
  const { movie } = pageProps;
  return <>
    <h1>{movie.title}</h1>
    <p>Release Date: {movie.release_date}</p>
    <p>Director: {movie.director}</p>
  </>;
}