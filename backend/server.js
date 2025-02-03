import express from 'express'
import sqlite3 from 'sqlite3'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const db = new sqlite3.Database(
  'players.db',
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) console.error(err.message)
    else console.log('✅ SQLite Connected')
  },
)

db.run(`CREATE TABLE IF NOT EXISTS teams (
  id INTEGER PRIMARY KEY,
  conference TEXT NOT NULL,
  division TEXT NOT NULL,
  city TEXT NOT NULL,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  abbreviation TEXT NOT NULL
)`)

db.run(`CREATE TABLE IF NOT EXISTS players (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  country TEXT NOT NULL,
  height TEXT,
  weight TEXT,
  position TEXT,
  jersey_number TEXT,
  college TEXT,
  draft_year INTEGER,
  draft_round INTEGER,
  draft_number INTEGER,
  team_id INTEGER NOT NULL,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
)`)

/* -------------------- ROUTES -------------------- */

// Create Team
app.post('/teams', (req, res) => {
  const { id, conference, division, city, name, full_name, abbreviation } = req.body
  db.run(
    `INSERT INTO teams (id, conference, division, city, name, full_name, abbreviation) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, conference, division, city, name, full_name, abbreviation],
    function (err) {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ id })
    },
  )
})

// List Teams
app.get('/teams', (req, res) => {
  db.all('SELECT * FROM teams', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(rows)
  })
})

// Create Player
app.post('/players', (req, res) => {
  const {
    first_name,
    last_name,
    country,
    height,
    weight,
    position,
    jersey_number,
    college,
    draft_year,
    draft_round,
    draft_number,
    team_id,
  } = req.body

  db.run(
    `INSERT INTO players (first_name, last_name, country, height, weight, position, jersey_number, college, draft_year, draft_round, draft_number, team_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      first_name,
      last_name,
      country,
      height,
      weight,
      position,
      jersey_number,
      college,
      draft_year,
      draft_round,
      draft_number,
      team_id,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ id: this.lastID })
    },
  )
})

//  List Players
app.get('/players', (req, res) => {
  db.all(
    `SELECT players.*, teams.id as team_id, teams.conference, teams.division, teams.city, teams.name, teams.full_name, teams.abbreviation
     FROM players
     JOIN teams ON players.team_id = teams.id`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message })

      const players = rows.map((row) => ({
        id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        country: row.country,
        height: row.height,
        weight: row.weight,
        position: row.position,
        jersey_number: row.jersey_number,
        college: row.college,
        draft_year: row.draft_year,
        draft_round: row.draft_round,
        draft_number: row.draft_number,
        team: {
          id: row.team_id,
          conference: row.conference,
          division: row.division,
          city: row.city,
          name: row.name,
          full_name: row.full_name,
          abbreviation: row.abbreviation,
        },
      }))

      res.json(players)
    },
  )
})

const PORT = 3000
app.listen(PORT, () => console.log(`🚀 API rodando em http://localhost:${PORT}`))
