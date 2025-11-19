import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./contexts/AuthContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Routes from "./Routes";
import theme from "./theme/index";
import "./assets/fonts/fonts.css";
import "./App.css";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <NotificationContextProvider>
            <AuthContextProvider>
              <Navbar />
              <Box flexGrow={1} width="full" height="full">
                <Routes />
              </Box>
              <Footer />
            </AuthContextProvider>
          </NotificationContextProvider>
        </ChakraProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
