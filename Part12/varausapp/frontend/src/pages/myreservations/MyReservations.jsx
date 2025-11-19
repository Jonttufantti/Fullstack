import { useEffect, useState } from "react";
import { Heading, Text, VStack } from "@chakra-ui/react";
import PageContainer from "../../components/PageContainer";
import MyReservation from "./components/MyReservation";
import computerReservationService from "../../services/computerReservations";

const MyReservations = () => {
  // TODO: show a message using NotificationContext if reservations can't be
  // loaded.

  const [reservations, setReservations] = useState([]);
  const [reservationsLoading, setReservationsLoading] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      setReservationsLoading(true);

      const { data } = await computerReservationService.getAllForCurrentUser();

      if (data) {
        setReservations(data);
        setReservationsLoading(false);
      } else {
        setReservations([]);
      }
    };
    fetchReservations();
  }, []);

  return (
    <PageContainer>
      <Heading as="h1" size="2xl" marginBottom="10">
        My Reservations
      </Heading>
      {reservationsLoading ? (
        "Loading..."
      ) : (
        <VStack
          as="ul"
          gap="4"
          width="full"
          maxWidth="5xl"
          listStyleType="none"
        >
          {!reservations.length <= 0 ? (
            reservations.map((reservation) => (
              <MyReservation
                key={reservation._id}
                reservation={reservation}
                setReservations={setReservations}
              />
            ))
          ) : (
            <>
              <Text>No reservations </Text>
            </>
          )}
        </VStack>
      )}
    </PageContainer>
  );
};

export default MyReservations;
