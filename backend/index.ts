import express from 'express'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors({
    origin: '*'
}))

const PORT = 8090;

app.get('/' , (_, res) => {
    res.json({message: 'Server is alive'})
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})