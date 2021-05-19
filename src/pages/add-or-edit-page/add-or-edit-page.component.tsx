import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightAddon } from "@chakra-ui/input";
import { Center, Flex, Heading } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Textarea } from "@chakra-ui/textarea";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EventInformation from "../../interfaces/EventInformation";
import { EventType } from "../../interfaces/EventType";
import {
  useAddOrEditPageData,
  useEvents,
  useHomepageData,
} from "../../redux/hooks";

interface AddOrEditPageProps {
  edit?: boolean;
}

const AddOrEditPage = ({ edit }: AddOrEditPageProps) => {
  const { eventId } = useParams<{ eventId?: string }>();
  const { events, createEvent, editEventInformation } = useEvents();
  const {
    title,
    changeTitle,
    type,
    changeType,
    address,
    changeAddress,
    time,
    changeTime,
    budget,
    changeBudget,
    other,
    changeOther,
    clearAllInputs,
  } = useAddOrEditPageData();
  const { date } = useHomepageData();
  let editingEvent: EventInformation | undefined;
  if (edit && eventId) {
    editingEvent = events.find((event) => event.id === +eventId);
  }
  useEffect(() => {
    if (editingEvent) {
      changeTitle(editingEvent.title);
      changeType(editingEvent.type);
      changeAddress(editingEvent.address || "");
      changeTime(editingEvent.time || "");
      changeBudget(editingEvent.budget || 0);
      changeOther(editingEvent.other || "");
      // Кастомный хук создаётся на каждый рендер, но нам не нужно постоянно менять состояние страницы
    } // eslint-disable-next-line
  }, [editingEvent]);
  const formTitle = edit ? "Изменить событие" : "Добавить событие";
  return (
    <Center>
      <Flex w="23rem" flexDirection="column" alignItems="center">
        <Heading as="h3" size="lg" margin="0.5rem 0">
          {formTitle}
        </Heading>
        <FormControl margin="0.5rem 0">
          <FormLabel>Название события</FormLabel>
          <Input
            type="text"
            placeholder="Бар за углом на Московской"
            value={title}
            onChange={(event) => changeTitle(event.target.value)}
          />
        </FormControl>
        <FormControl margin="0.5rem 0">
          <FormLabel>Тип события</FormLabel>
          <Select
            value={type}
            onChange={(event) => changeType(event.target.value as EventType)}
          >
            <option value="Мероприятие">Мероприятие</option>
            <option value="Праздничный день">Праздничный день</option>
            <option value="Пометка / Другое">Пометка / Другое</option>
          </Select>
        </FormControl>
        {type === "Мероприятие" && (
          <>
            <FormControl margin="0.5rem 0">
              <FormLabel>Куда идти?</FormLabel>
              <Input
                type="text"
                placeholder="Бар за углом на Московской"
                value={address}
                onChange={(event) => changeAddress(event.target.value)}
              />
            </FormControl>
            <FormControl margin="0.5rem 0">
              <FormLabel>Во сколько?</FormLabel>
              <Input
                type="text"
                value={time}
                onChange={(event) => changeTime(event.target.value)}
              />
            </FormControl>
          </>
        )}
        {type === "Праздничный день" && (
          <>
            <FormControl margin="0.5rem 0">
              <FormLabel>Бюджет на день</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  value={budget}
                  onChange={(event) => changeBudget(+event.target.value)}
                />
                <InputRightAddon children="$" />
              </InputGroup>
            </FormControl>
          </>
        )}
        {type === "Пометка / Другое" && (
          <>
            <FormControl margin="0.5rem 0">
              <FormLabel>Описание</FormLabel>
              <Textarea
                placeholder="В этот день я буду..."
                value={other}
                onChange={(event) => changeOther(event.target.value)}
              />
            </FormControl>
          </>
        )}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          margin="1rem 0"
        >
          <Link to="/">
            <Button w="5rem" colorScheme="red">
              Отмена
            </Button>
          </Link>
          <Link to="/">
            <Button
              w="10rem"
              onClick={() => {
                edit
                  ? title &&
                    editingEvent &&
                    editEventInformation({
                      id: editingEvent.id,
                      title,
                      type,
                      time,
                      date: editingEvent.date,
                      address,
                      budget,
                      other,
                    })
                  : title &&
                    createEvent({
                      id: events[events.length - 1]?.id + 1 || 1,
                      title,
                      type,
                      date,
                      address,
                      time,
                      budget,
                      other,
                    });
                clearAllInputs();
              }}
            >
              Сохранить
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Center>
  );
};

export default AddOrEditPage;
