const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const Author = require("./models/authors");
const Book = require("./models/books");
const User = require("./models/user");

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      let filter = {};
      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }
      return Book.find(filter).populate("author");
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },

  Author: {
    bookCount: async (root) => {
      return Book.countDocuments({ author: root._id });
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      try {
        let author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }

        const book = new Book({
          title: args.title,
          published: args.published,
          author: author._id,
          genres: args.genres,
        });

        await book.save();
        return book.populate("author");
      } catch (error) {
        throw new GraphQLError("Adding book failed", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args, error },
        });
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) return null;

        author.born = args.setBornTo;
        await author.save();
        return author;
      } catch (error) {
        throw new GraphQLError("Editing author failed", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args, error },
        });
      }
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new GraphQLError("Creating user failed", {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args, error },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      const hardcodedPassword = "secret";

      if (!user || args.password !== hardcodedPassword) {
        throw new GraphQLError("Wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

module.exports = resolvers;
