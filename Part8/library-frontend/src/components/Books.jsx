import { useState } from "react";

const Books = ({ show, books }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);

  if (!show) {
    return null;
  }

  const genres = Array.from(new Set(books.flatMap((b) => b.genres || [])));

  console.log("Genres", { genres });

  const filteredBooks = selectedGenre
    ? books.filter((b) => b.genres.includes(selectedGenre))
    : books;

  return (
    <div>
      <h2>books</h2>

      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setSelectedGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
