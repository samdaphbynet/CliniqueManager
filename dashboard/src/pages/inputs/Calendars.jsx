import { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Header } from "../../components";
import ModalAppointment from '../../components/ModalAppointment';

const Calendars = () => {
  const [currentEvents, setCurrentEvents] = useState([]);


  // get all appointments from database
  useEffect(() => {
    const fetchAllAppointment = async () => {
      try {
        const allAppointment = await axios.get(
          "http://localhost:5000/api/v1/appointment/all",
          { withCredentials: true }
        );
        if (!allAppointment) {
          setCurrentEvents([]);
          return;
        }
        const events = allAppointment.data.appointment.map((app) => ({
          id: app._id,
          title: app.firstName + " " + app.lastName,
          start: app.appointment,
          allDay: true,
        }));
        setCurrentEvents(events);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllAppointment();
  }, []);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;

    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };
      calendarApi.addEvent(newEvent);
      setCurrentEvents((prevEvent) => [...prevEvent, newEvent]);
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
      setCurrentEvents((prevEvent) =>
        prevEvent.filter((event) => event.id !== selected.event.id)
      );
    }
  };


  return (
    <Box m="20px">
      <Box m="5px 20px" display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Calendrier" subtitle="Gérer tout les rendez-vous de vous patients" />
        <ModalAppointment />
      </Box>

      <Box display="flex" justifyContent="space-between" backgroundColor="#EBEBEB" p="20px" boxShadow="0 0px 20px 0px #A0A0A0">
        {/* CALENDAR SIDEBAR */}
        <Box
          p="10px"
          flex="15%"
          borderRadius="4px"
          backgroundColor="#747474"
          height="74vh"
          overflow="scroll"
        >
          <Typography variant="h5">Liste de rendez-vous</Typography>

          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  margin: "10px 0",
                  borderRadius: "2px",
                  backgroundColor: "#DDDDDD",
                  color: "#000000",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography color="#4E4E4E">
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* 📆📅📆📅📆📅📆📅📆📅📆📅 CALENDAR 📆📅📆📅📆📅📆📅📆📅📆📅 */}
        <Box flex="1 1 100%" ml="15px" backgroundColor="#3D3D3D" p="20px" borderRadius="4px">
          <FullCalendar
            height="70vh"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendars;
