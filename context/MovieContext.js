import { createContext, useContext, useState } from "react";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [schedule, setSchedule] = useState([]);

  const addMovie = (movie) => {
    setSchedule((prevSchedule) => [...prevSchedule, movie]);
  };

  const deleteMovie = (id) => {
    setSchedule((prevSchedule) =>
      prevSchedule.filter((movie) => movie.id !== id)
    );
  };

  const editMovie = (updatedMovie) => {
    setSchedule((prevSchedule) =>
      prevSchedule.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
  };

  return (
    <MovieContext.Provider
      value={{ schedule, addMovie, deleteMovie, editMovie }}
    >
      {children}{" "}
    </MovieContext.Provider>
  );
};

const useMovieContext = () => {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }

  return context;
};
