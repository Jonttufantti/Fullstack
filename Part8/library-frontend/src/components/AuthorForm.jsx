import { useState } from "react";
import Select from "react-select";
import { useMutation } from "@apollo/client/react";
import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";
import { useQuery } from "@apollo/client/react";

const AuthorForm = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [birthyear, setBirthyear] = useState("");

  const result = useQuery(ALL_AUTHORS);
  const [changeBirthyear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const options = result.data.allAuthors.map((a) => ({
    value: a.name,
    label: a.name,
  }));

  const submit = async (event) => {
    event.preventDefault();
    if (!selectedAuthor) return;

    try {
      const result = await changeBirthyear({
        variables: { name: selectedAuthor.value, setBornTo: Number(birthyear) },
      });
      console.log("mutation result:", result);
    } catch (error) {
      console.error("GraphQL error:", error);
    }

    setSelectedAuthor(null);
    setBirthyear("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name{" "}
          <Select
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            options={options}
            placeholder="Select author..."
          />
        </div>
        <div>
          born{" "}
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorForm;
