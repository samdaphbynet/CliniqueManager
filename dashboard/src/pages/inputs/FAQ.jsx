import { useEffect, useState } from "react";
import axios from 'axios';
import { Header } from "../../components";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import { Box, Button, Input, TextareaAutosize } from "@mui/material";
import { toast } from 'react-toastify';


const FAQ = () => {

  const [questions, setQuestions] = useState([])
  const [isNone, setIsNone] = useState(false)
  const [answers, setAnswers] = useState({
    question: "",
    answer: "",
  })

  // fetch questions
  useEffect(() => {
    const fetchQuestions = async() => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/question/getall")
        setQuestions(response.data.questions)
      } catch (error) {
        console.log("Error fetching questions:", error)
      }
    }
    fetchQuestions()
  }, [])

  // handle change input
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setAnswers((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  // handle form questions
  const handleQuestions = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/v1/question/faq", answers)
        toast.success("Question ajoutée avec succès!")
        setAnswers({question: "", answer: ""})
        setIsNone(false)
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'ajout de la question!")
      console.log(error)
    }
  }

  return (
    <Box m="80px 20px 20px 320px">
      {/* header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="FAQ" subtitle="Foire Aux Questions" />
        <Button
          onClick={() => setIsNone(!isNone)}
          sx={{
            backgroundColor: "#0084FF", 
            color: "white",
            p: "15px 20px",
            fontSize: "14px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#00AEFF",
            }
          }}>
            {isNone ? "fermer le formulaire" : "Ajouter une question"}
        </Button>
      </Box>
      {/* form to add questions */}
      <Box width="70%" margin="auto" my="20px" color="black" display={isNone ? "block" : "none"}>
        <Typography mb="20px" variant="h5">Questions fréquentes</Typography>
        <form onSubmit={handleQuestions} style={{position: "relative", width: "100%", marginBottom: "80px"}}>
          <Input 
            name="question"
            value={answers.question}
            placeholder="question..."
            onChange={handleInputChange}
            fullWidth
            sx={{
              mb: "20px",
              p: "10px",
              borderRadius: "5px",
              backgroundColor: "#242424",
              color: "#FFFFFF",
              fontSize: "15px",
            }}
          />
          <TextareaAutosize
            name="answer" 
            placeholder="Réponse..."
            value={answers.answer} 
            onChange={handleInputChange}
            minRows={4}
            style={{
              width: "100%",
              marginBottom: "20px",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#242424",
              color: "#FFFFFF",
              fontSize: "15px",
            }}
          />
          
          <Button sx={{
            position: "absolute",
            top: "180px",
            right: "0px",
            backgroundColor: "#0084FF", 
            color: "white",
            p: "10px 20px",
            fontSize: "14px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#00AEFF",
            },
          }} type="submit">Ajouter</Button>
        </form>
      </Box>

      {
        questions.map(({ _id, question, answer }) =>

          _id === 1 // by default 1st Accordion open...
            ? (
              <Accordion key={_id} defaultExpanded>

                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color="#95F88C" variant="h5">{question}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography>{answer}</Typography>
                </AccordionDetails>

              </Accordion>
            ) : (
              <Accordion key={_id}>

                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography color="#95F88C" variant="h5">{question}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography>{answer}</Typography>
                </AccordionDetails>

              </Accordion>
            )
        )
      }
    </Box>
  );
};

export default FAQ;