import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../../redux/hooks";

interface EventBoxProps {
  id: number;
  title: string;
  budget?: number;
  address?: string;
  time?: string;
  other?: string;
}

const EventBox = ({
  id,
  title,
  budget,
  address,
  time,
  other,
}: EventBoxProps) => {
  const [isHover, setIsHover] = useState(false);
  const { removeEvent } = useEvents();
  return (
    <Box
      padding="1rem"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Heading
          as="h4"
          size="sm"
          color="dodgerblue"
          textDecoration="underline"
        >
          {title}
        </Heading>
        <Flex alignItems="center" minH="2rem">
          {isHover && (
            <>
              <Link to={`/edit/${id}`}>
                <EditIcon w={4} h={4} />
              </Link>
              <DeleteIcon
                w={4}
                h={4}
                marginLeft="0.5rem"
                cursor="pointer"
                onClick={() => removeEvent(id)}
              />
            </>
          )}
        </Flex>
      </Flex>
      {!!budget && budget > 0 && (
        <Text fontSize="sm" margin="0.5rem 0">
          Бюджет: {budget}$
        </Text>
      )}
      {address && (
        <Text fontSize="sm" margin="0.5rem 0">
          Адрес: {address}
        </Text>
      )}
      {time && (
        <Text fontSize="sm" margin="0.5rem 0">
          Время: {time}
        </Text>
      )}
      {other && (
        <Text fontSize="sm" margin="0.5rem 0">
          Другое: {other}
        </Text>
      )}
    </Box>
  );
};

export default EventBox;
