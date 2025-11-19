import { Flex, Heading } from "@chakra-ui/react";
import PageContainer from "../../components/PageContainer";
import ComputerList from "./components/ComputerList";
import MeetingSpaceList from "./components/MeetingSpaceList";

const Home = () => {
  return (
    <PageContainer>
      <Flex flexDirection="column" align="center" gap="20">
        <Flex flexDirection="column" align="center">
          <Heading as="h2" size="2xl" marginBottom="10">
            Computers
          </Heading>
          <ComputerList />
        </Flex>
        <Flex flexDirection="column" align="center">
          <Heading as="h2" size="2xl" marginBottom="10">
            Meeting Spaces
          </Heading>
          <MeetingSpaceList />
        </Flex>
      </Flex>
    </PageContainer>
  );
};

export default Home;
