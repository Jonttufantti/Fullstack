import ReactDOM from 'react-dom/client'
import App from './App'
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { HttpLink } from '@apollo/client/link/http'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),

})

const query = gql`
  query {
    allPersons  {
      name,
      phone,
      address {
        street,
        city
      }
      id
    }
  }
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })


ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)