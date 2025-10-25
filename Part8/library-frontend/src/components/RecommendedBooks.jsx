import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ME } from "../queries";

const RecommendedBooks = ({ show }) => {
  const { data: userData, loading: userLoading } = useQuery(ME);
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS);

  if (!show) return null;
  if (userLoading || booksLoading) return <div>loading...</div>;

  const favoriteGenre = userData.me.favoriteGenre;
  const filteredBooks = booksData.allBooks.filter((book) =>
    book.genres.includes(favoriteGenre)
  );

  return (
    <div>
      <h2>Recommended books</h2>
      <p>
        Books in your favorite genre <b>{favoriteGenre}</b>:
      </p>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((b) => (
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

export default RecommendedBooks;
