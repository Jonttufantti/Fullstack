import { useState, useContext } from "react";
import { Box, Grid, GridItem, Input, Button, Text } from "@chakra-ui/react";
import loginimg from "../../assets/loginbanner.png";

import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="stretch" justify="center">
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem>
          <Box position="relative" textAlign="center" height="100%">
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="#0a0d26"
              zIndex={0}
            />
            <Box
              position="relative"
              zIndex={1}
              height="100%"
              width="100%"
              overflow="hidden"
            >
              <img
                src={loginimg}
                alt="Login Banner"
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              />
            </Box>
            <Text
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              fontSize="4xl"
              fontWeight="bold"
              color="white"
              zIndex={2}
            >
              Book Your Space
            </Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
          >
            <Box maxWidth="440px" mx="auto">
              <Box mb={4}>
                <Text fontWeight="bold" fontSize="3xl">
                  Welcome Back!
                </Text>
                <Text color="gray.600">Please login here</Text>
              </Box>
              <Box mb={4}>
                <label htmlFor="username">E-mail / Username</label>
                <Input
                  type="text"
                  placeholder="username"
                  id="username"
                  onChange={handleChange}
                />
              </Box>
              <Box mb={4}>
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  placeholder="password"
                  id="password"
                  onChange={handleChange}
                />
              </Box>
              <Box mb={4} textAlign="right">
                <a href="#">Forgot Password</a>
              </Box>
              <Button
                colorScheme="blue"
                borderRadius="md"
                onClick={handleClick}
                width="full"
                mb={4}
              >
                Login
              </Button>
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Login;
