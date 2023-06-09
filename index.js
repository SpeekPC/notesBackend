const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(n => n.id === id)
  note
    ? res.json(note)
    : res.status(404).end()
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(n => n.id !== id)

  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    res.status(400).json({
      error: 'Content missing'
    })
  } else {
    const note = {
      id: generateId(),
      content: body.content,
      important: body.important || false
    }

    notes = notes.concat(note)

    res.json(note)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`App running on port "http://localhost:${PORT}"`)
})