import { Flex } from "@chakra-ui/react";

const PageContainer = ({ children }) => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      width="95%"
      maxWidth="1520px"
      paddingTop="16"
      paddingBottom="16"
      margin="0 auto"
    >
      {children}
    </Flex>
  );
};

export default PageContainer;
