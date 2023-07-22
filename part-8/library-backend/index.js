const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()

// connect to database
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

// schema
const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(
      author: String
      genre: String
    ): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // empty parameter
      if (!args.author && !args.genre) {
        return Book.find({})
      }

      let result = await Book.find({})
      
      // filter by author
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        result = result.filter(book => book.author.toString() === author._id.toString())
      }

      // filter by genre
      if (args.genre) {
        result = result.filter(book => book.genres.includes(args.genre))
      }

      return result
    },
    allAuthors: async () => Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
      const authors = await Author.find({})

      // save new author
      if (!authors.find(author => author.name === args.author)) {
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
      }

      // retrieve author
      const author = await Author.findOne({ name: args.author })

      // save new book
      const newBook = new Book({ ...args, author: author._id })
      await newBook.save()

      return newBook
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      // author not found
      if (!author) {
        return null
      }

      // author found
      author.born = args.setBornTo 
      await author.save()
      return author
    }
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ author: root._id })
      return books.length
    }
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author)
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})