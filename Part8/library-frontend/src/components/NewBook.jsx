import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from "../queries";
import { updateCache, mergeAuthors } from "../utils/cache";

const NewBook = ({ setError, show }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      setError(error.message);
    },
    update: (cache, { data: { addBook } }) => {
      updateCache(cache, { query: ALL_BOOKS }, addBook, "allBooks");
      updateCache(
        cache,
        { query: ALL_AUTHORS },
        addBook.author,
        "allAuthors",
        mergeAuthors
      );
    },
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    try {
      await addBook({
        variables: {
          title,
          author,
          published: Number(published),
          genres,
        },
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    if (!genre.trim()) return;
    setGenres([...genres, genre.trim()]);
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
