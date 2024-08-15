import FAQ from "../models/faqSchema.js"


// function to add new question to FAQ
export const questions = async (req, res) => {
    try {
        const {question, answer} = req.body;
        if (!question ||!answer) {
            return res.status(400).json({message: "Please provide both question and answer"})
        }
        const newQuestion = new FAQ({question, answer});
        await newQuestion.save();
        res.status(201).json({message: "Question added successfully"})

    } catch (error) {
        console.log("Error in faq controller", error);
        res.status(500).json({message: "Server error"})
    }
}

// function to get all questions from FAQ
export const getQuestions = async (req, res) => {
    try {
        const questions = await FAQ.find()
        if (questions.length < 1) {
            return res.status(404).json({message: "No questions found"})
        }
        res.status(200).json({questions})
    } catch (error) {
        console.log("Error getting questions", error)
        res.status(500).json({message: "Server error"})
    }
}