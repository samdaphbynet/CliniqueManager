import { useState, useEffect, useContext } from "react";
import axios from "axios";
import StatBox from '../../components/StatBox';
import EmailIcon from '@mui/icons-material/Email';
import { Box } from '@mui/material'
import { Context } from "../../index";

const StateEmail = () => {

    const [message, setMessage] = useState([])
    const {baseUrl} = useContext(Context)

    // Get all messages
    useEffect(() => {
      const getAllMessages = async () => {
          try {
              const response = await axios.get(`${baseUrl}/api/v1/message/patient/all`)
              setMessage(response.data.allMessage)
          } catch (error) {
              console.error(error)
          }
      }
      getAllMessages()
  }, []);

  return (
    <Box
          gridColumn="span 3"
          backgroundColor="#EBEBEB"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 0px 20px 0px #A0A0A0"
        >
          <StatBox
            title={message.length}
            subtitle="Mails reçus"
            progress={message.length / 100}
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: "#00AEFF", fontSize: "26px" }}
              />
            }
          />
        </Box>
  )
}

export default StateEmail