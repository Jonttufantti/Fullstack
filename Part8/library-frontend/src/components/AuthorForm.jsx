import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";

import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

const AuthorForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [birthyear, setBirthyear] = useState("");

  const [changeBirthyear, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    const cleanedName = name.trim();
    console.log({ name, setBornTo: Number(birthyear) });

    try {
      const result = await changeBirthyear({
        variables: { name: cleanedName, setBornTo: Number(birthyear) },
      });
      console.log("mutation result:", result);
    } catch (error) {
      console.error("GraphQL error:", error);
    }

    setName("");
    setBirthyear("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
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
