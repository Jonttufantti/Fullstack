import { useContext } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Button,
  Link,
  Box,
  Flex,
  Spacer,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../contexts/AuthContext";
import MapPopup from "../roommap/MapPopup";
import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.png";

const Navbar = () => {
  // Get the current location
  const location = useLocation();
  // Access user and logout function from the authentication context
  const { user, logout } = useContext(AuthContext);

  // Handler for logout action
  const handleLogout = () => {
    logout();
    // Redirect to the logout confirmation page
    window.location.href = "/logout-confirmation";
  };
  if (location.pathname === "/login") {
    return null;
  }

  return (
    <Box
      bg="white"
      h="124px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex maxW="1024px" w="100%" px="20px" alignItems="center">
        {/* Logo */}
        {location.pathname === "/login" ? (
          <RouterLink to="/">
            <Image src={logo} alt="" />
          </RouterLink>
        ) : (
          <>
            <Link as={RouterLink} to="/">
              <Image src={logo} alt="" />
            </Link>
            <Spacer />
            {/* Navigation links */}
            <Flex gap="35px" alignItems="center" mb="5px">
              <Link
                as={RouterLink}
                to="/"
                fontWeight="semibold"
                color="shade.900"
              >
                Home
              </Link>
              {/* Show "My Reservations" link only if user is logged in */}
              {user && (
                <Link
                  as={RouterLink}
                  to="/my-reservations"
                  fontWeight="semibold"
                  color="shade.900"
                >
                  My Reservations
                </Link>
              )}
              {/* Map Popup */}
              <MapPopup />
            </Flex>
            <Spacer />
            {/* User dropdown menu */}
            {user ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<FontAwesomeIcon icon={faCaretDown} />}
                  variant="ghost"
                >
                  <Flex alignItems="center">
                    <Image src={profile} alt="" mr="1" />
                    {user.username}
                  </Flex>
                </MenuButton>
                <MenuList>
                  {/* Logout button */}
                  <MenuItem onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              // Show login button if user is not logged in
              <Button as={RouterLink} to="/login">
                Login
              </Button>
            )}
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
