import app from './app.js';
import messageRoutes from './routes/message.route.js'

const PORT = process.env.PORT

app.use("/", messageRoutes);
app.use("/message", messageRoutes);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})