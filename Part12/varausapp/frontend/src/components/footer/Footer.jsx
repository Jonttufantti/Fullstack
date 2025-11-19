// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import logo from "../../assets/logo.svg";
import footerthefirma from "../../assets/footerthefirma.png";
import footerturkuamk from "../../assets/footerturkuamk.png";

const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/login") {
    return null;
  }
  
  return (
    <Box bg="#0a0d26" color="#ffffff" py={12}>
      <Box maxW="1520px" mx="auto" px={4}>
        <Flex flexDirection={{ base: "column", md: "row" }} gap={8} alignItems="center">
          <Box flex={{ base: "0 0 100%", md: "1" }} textAlign="center">
            <a href="/" style={{ color: "inherit", textDecoration: "none" }}>
              <Box>
                <img src={logo} alt="" />
              </Box>
            </a>
            <Box mt={4}>
              <a href="#">
                <img src={footerthefirma} alt="theFIRMAN logo" />
              </a>
            </Box>
          </Box>
          <Box flex="2" textAlign="center">
            <ul className="footermenu" style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Flex alignItems="center" justifyContent="center">
                  <FaMapMarkerAlt style={{ marginRight: "4px", marginTop: "2px" }} />
                  <a href="#" style={{ color: "#ffffff" }}>
                    <span style={{ verticalAlign: "middle", fontWeight: "bold" }}>theFIRMA Office</span><br />
                    <span style={{ verticalAlign: "middle" }}>
                      Turku University of Applied Sciences<br />
                      Joukahaisenkatu 3-5, 20520 Turku
                    </span>
                  </a>
                </Flex>
              </li>
              <li>
                <Flex alignItems="center" justifyContent="center">
                  <FaEnvelope style={{ marginRight: "4px" }} />
                  <a href="thefirma@edu.turkuamk.fi" style={{ color: "#ffffff" }}>
                    <span style={{ verticalAlign: "middle" }}>thefirma(at)edu.turkuamk.fi</span>
                  </a>
                </Flex>
              </li>
              <li>
                <Flex alignItems="center" justifyContent="center">
                  <FaPhone style={{ marginRight: "4px" }} />
                  <a href="tel:+358 44 9072 080" style={{ color: "#ffffff" }}>
                    <span style={{ verticalAlign: "middle" }}>+358 44 9072 080</span>
                  </a>
                </Flex>
              </li>
            </ul>
          </Box>
          <Box flex="1">
            <a href="#">
              <img src={footerturkuamk} alt="Turun ammattikorkeakoulun logo" />
            </a>
          </Box>
        </Flex>
        <Box borderTop="1px solid #8385a457" mt={8} py={4} textAlign="center" color="#8385a4" opacity={0.6} fontSize="14px" lineHeight="21px">
          ©varaus 2023. All Rights reserved.
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
