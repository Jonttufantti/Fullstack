import { useState } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client/react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
import AuthorForm from "./components/AuthorForm";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client/react";
import RecommendedBooks from "./components/RecommendedBooks";
import { updateCache, mergeAuthors } from "./utils/cache";

const App = () => {
  const [page, setPage] = useState("authors");
  const resultAuthors = useQuery(ALL_AUTHORS);
  const resultBooks = useQuery(ALL_BOOKS);
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      alert(`New book added: ${addedBook.title}`);

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook, "allBooks");

      updateCache(
        client.cache,
        { query: ALL_AUTHORS },
        addedBook.author,
        "allAuthors",
        mergeAuthors
      );
    },
  });

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  if (resultAuthors.loading) {
    return <div>loading...</div>;
  }

  if (resultBooks.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );
  }

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommended")}>recommended</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === "authors"}
        authors={resultAuthors.data?.allAuthors || []}
      />
      <AuthorForm show={page === "authors"} setError={notify} />

      <Books show={page === "books"} books={resultBooks.data?.allBooks || []} />

      <NewBook show={page === "add"} setError={notify} />

      <RecommendedBooks show={page === "recommended"} />
    </div>
  );
};

export default App;
