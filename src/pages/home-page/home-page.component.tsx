import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, StackDivider, VStack } from "@chakra-ui/layout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import EventBox from "../../components/event-box/event-box.component";
import { useEvents, useHomepageData } from "../../redux/hooks";

const HomePage = () => {
  const { date, changeDate } = useHomepageData();
  const { events } = useEvents();
  return (
    <Center margin="2rem">
      <Box w="90%">
        <Flex justifyContent="space-evenly" alignItems="center">
          <Flex flexDirection="column" alignItems="center">
            <Calendar
              onChange={(date) =>
                changeDate(
                  date instanceof Date
                    ? date.toISOString()
                    : date[0].toISOString()
                )
              }
              value={new Date(date)}
            />
            <Link to="/add">
              <Button w="15rem" marginTop="1rem">
                Добавить
              </Button>
            </Link>
          </Flex>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            borderWidth="1px"
            borderRadius="lg"
            h="30rem"
            w="25rem"
            alignItems="normal"
            overflowY="scroll"
          >
            {events
              .filter((event) => {
                const eventDate = new Date(event.date);
                const selectedDate = new Date(date);
                return (
                  eventDate.getDate() === selectedDate.getDate() &&
                  eventDate.getMonth() === selectedDate.getMonth() &&
                  eventDate.getFullYear() === selectedDate.getFullYear()
                );
              })
              .map((event) => {
                return (
                  <EventBox
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    budget={event.budget}
                    address={event.address}
                    time={event.time}
                    other={event.other}
                  />
                );
              })}
          </VStack>
        </Flex>
      </Box>
    </Center>
  );
};

export default HomePage;
