import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS } from "../queries";
import { useState, useEffect } from "react";

const Books = ({ show }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const { data: allBooksData, loading: loadingAllBooks } = useQuery(ALL_BOOKS);

  const {
    data: filteredBooksData,
    loading: loadingFilteredBooks,
    refetch,
  } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    skip: !show,
  });

  useEffect(() => {
    if (show) {
      refetch({ genre: selectedGenre });
    }
  }, [selectedGenre, show, refetch]);

  if (!show) return null;
  if (loadingAllBooks || loadingFilteredBooks) return <div>loading...</div>;

  const allGenres = Array.from(
    new Set(allBooksData.allBooks.flatMap((b) => b.genres))
  );

  const books = selectedGenre
    ? filteredBooksData.allBooks
    : allBooksData.allBooks;

  return (
    <div>
      <h2>Books {selectedGenre ? `in ${selectedGenre}` : ""}</h2>

      <div>
        <button onClick={() => setSelectedGenre(null)}>All genres</button>
        {allGenres.map((g) => (
          <button key={g} onClick={() => setSelectedGenre(g)}>
            {g}
          </button>
        ))}
      </div>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
