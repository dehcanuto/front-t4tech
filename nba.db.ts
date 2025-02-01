import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err)
  } else {
    console.log('Database connected!')
  }
})

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY,
      conference TEXT,
      division TEXT,
      city TEXT,
      name TEXT,
      full_name TEXT,
      abbreviation TEXT
    )
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      position TEXT,
      height TEXT,
      weight TEXT,
      jersey_number TEXT,
      college TEXT,
      country TEXT,
      draft_year INTEGER,
      draft_round INTEGER,
      draft_number INTEGER,
      team_id INTEGER,
      FOREIGN KEY (team_id) REFERENCES teams(id)
    )
  `)
})

export default db
