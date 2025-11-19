// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";


const LogoutConfirmation = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (countdown === 1) {
        navigate("/");
      } else {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countdown, navigate]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Heading size="xl" marginBottom="4">You have been logged out</Heading>
      <Text fontSize="xl" color="gray">Redirecting to the home page in {countdown} seconds...</Text>
    </Box>
  );
};

export default LogoutConfirmation;
