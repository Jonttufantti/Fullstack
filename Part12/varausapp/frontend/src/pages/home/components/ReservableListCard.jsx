import { Button, Card, CardBody, Image, Text, VStack } from "@chakra-ui/react";

/**
 * A card to show in ReservableList.
 *
 * Props:
 * - item: object that has the following properties: id, name and image.
 * - onClick: function to call when "Reserve" button is clicked. Receives the id
 *   of the item as an argument.
 */
const ReservableListCard = ({ item, onClick }) => {
  const { id, name, image } = item;

  return (
    <Card
      as="li"
      variant="outline"
      width="72"
      bgGradient="linear(to-b, transparent, shade.100)"
    >
      <CardBody>
        <VStack spacing="4">
          <Image
            src={image}
            alt=""
            width="140px"
            height="140px"
            marginBottom={{ lg: "2.5" }}
          />
          <Text fontSize={{ base: "lg", lg: "xl" }} fontWeight="semibold">
            {name}
          </Text>
          <Button
            variant="outline"
            width="full"
            height={{ base: "10", lg: "12" }}
            onClick={() => onClick(id)}
          >
            Reserve
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ReservableListCard;
