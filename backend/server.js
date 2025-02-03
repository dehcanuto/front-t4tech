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

// Populate Players with Teams (without duplicating teams)
app.post('/players', (req, res) => {
  const { players } = req.body

  const insertTeams = players.map((player) => ({
    id: player.team.id,
    name: player.team.name,
    conference: player.team.conference,
    division: player.team.division,
    city: player.team.city,
    full_name: player.team.full_name,
    abbreviation: player.team.abbreviation,
  }))

  const placeholders = insertTeams.map(() => '(?, ?, ?, ?, ?, ?, ?)').join(', ')

  const teamValues = insertTeams.flatMap((team) => [
    team.id,
    team.name,
    team.conference,
    team.division,
    team.city,
    team.full_name,
    team.abbreviation,
  ])

  const insertTeamQuery = `
    INSERT INTO teams (id, name, conference, division, city, full_name, abbreviation)
    VALUES ${placeholders}
    ON CONFLICT(id) DO NOTHING
  `

  db.run(insertTeamQuery, teamValues, function (err) {
    if (err) {
      console.error('Erro ao inserir os times:', err.message)
      return res.status(500).json({ message: 'Erro ao salvar os times', data: err.message })
    }

    const playerDataToSend = players.map((player) => ({
      id: player.id,
      first_name: player.first_name,
      last_name: player.last_name,
      country: player.country,
      height: player.height,
      weight: player.weight,
      position: player.position,
      jersey_number: player.jersey_number,
      college: player.college,
      draft_year: player.draft_year,
      draft_round: player.draft_round,
      draft_number: player.draft_number,
      team_id: player.team.id,
    }))

    const playerPlaceholders = playerDataToSend
      .map(() => '(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
      .join(', ')

    const playerValues = playerDataToSend.flatMap((player) => [
      player.id,
      player.first_name,
      player.last_name,
      player.country,
      player.height,
      player.weight,
      player.position,
      player.jersey_number,
      player.college,
      player.draft_year,
      player.draft_round,
      player.draft_number,
      player.team_id,
    ])

    const playerQuery = `
      INSERT INTO players (id, first_name, last_name, country, height, weight, position, jersey_number, college, draft_year, draft_round, draft_number, team_id)
      VALUES ${playerPlaceholders}
      ON CONFLICT(id) DO UPDATE
      SET first_name = excluded.first_name, last_name = excluded.last_name,
          country = excluded.country, height = excluded.height,
          weight = excluded.weight, position = excluded.position,
          jersey_number = excluded.jersey_number, college = excluded.college,
          draft_year = excluded.draft_year, draft_round = excluded.draft_round,
          draft_number = excluded.draft_number, team_id = excluded.team_id
    `

    db.run(playerQuery, playerValues, function (err) {
      if (err) {
        console.error('Erro ao salvar jogadores:', err.message)
        return res.status(500).json({ message: 'Erro ao salvar jogadores', data: err.message })
      }

      return res
        .status(200)
        .json({ message: `${players.length} jogadores foram salvos com sucesso!` })
    })
  })
})

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

// View Player
app.get('/players/:id', (req, res) => {
  const { id } = req.params

  const query = `
    SELECT
      p.id AS player_id,
      p.first_name,
      p.last_name,
      p.country,
      p.height,
      p.weight,
      p.position,
      p.jersey_number,
      p.college,
      p.draft_year,
      p.draft_round,
      p.draft_number,
      t.id AS team_id,
      t.name AS team_name,
      t.conference,
      t.division,
      t.city,
      t.full_name,
      t.abbreviation
    FROM players p
    JOIN teams t ON p.team_id = t.id
    WHERE p.id = ?
  `

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error('Error searching for player:', err.message)
      return res.status(500).json({ message: 'Error searching for player', data: err.message })
    }

    if (!row) {
      return res.status(404).json({ message: 'Player not found' })
    }

    const player = {
      id: row.player_id,
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
        name: row.team_name,
        conference: row.conference,
        division: row.division,
        city: row.city,
        full_name: row.full_name,
        abbreviation: row.abbreviation,
      },
    }

    return res.status(200).json(player)
  })
})

// Update Player
app.put('/players/:id', (req, res) => {
  const { id } = req.params
  const { player } = req.body

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
    team,
  } = player

  db.run(
    `UPDATE players
     SET first_name = ?, last_name = ?, country = ?, height = ?, weight = ?, position = ?,
         jersey_number = ?, college = ?, draft_year = ?, draft_round = ?, draft_number = ?, team_id = ?
     WHERE id = ?`,
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
      team.id,
      id,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message })

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Player not found!' })
      }

      res.json({ message: 'Player updated successfully!' })
    },
  )
})

// Delete Player
app.delete('/players/:id', (req, res) => {
  const { id } = req.params

  const query = 'DELETE FROM players WHERE id = ?'

  db.run(query, [id], function (err) {
    if (err) {
      console.error('Erro ao remover jogador:', err.message)
      return res.status(500).json({ message: 'Erro ao remover jogador', data: err.message })
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Jogador não encontrado' })
    }

    return res.status(200).json({ message: `Jogador com id ${id} foi removido com sucesso!` })
  })
})

// List Players
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
app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`))
