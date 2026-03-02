import express from "express"
import { quotes } from "./src/quotes.js"

const app = express()
const port = 3001

function randomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

app.get("/api/frase", (req, res) => {
  res.json({
    frase: randomQuote()
  })
})

app.listen(port, "0.0.0.0", () => {
  console.log("API rodando na porta", port)
})