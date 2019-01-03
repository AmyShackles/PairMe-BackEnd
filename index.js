require("dotenv").config()

const clientID = process.env.CLIENTID
const clientSecret = process.env.CLIENTSECRET
var request = require("request")
const server = require("./api/server.js")

// end point for testing server running
server.get("/", (req, res) => {
  res.send("Ngrok is working!  Path hit: " + req.url)
})

server.get("/oauth", function(req, res) {
  if (!req.query.code) {
    res.status(500)
    res.send({ Error: "Looks like we're not getting code." })
    console.log("Looks like we're not getting code.")
  } else {
    request(
      {
        url: "http://slack.com/api/oauth.access",
        qs: {
          code: req.query.code,
          client_id: clientID,
          client_secret: clientSecret
        },
        method: "GET"
      },
      function(error, response, body) {
        if (error) {
          console.log(error)
        } else {
          res.json(body)
        }
      }
    )
  }
})

server.post("/", (req, res) => {
  res.status(200).send(req.body.challenge)
})

server.post("/command", function(req, res) {
  res.send("Your ngrok tunnel is up and running!")
})

const port = process.env.PORT || 5555 // update production environment PORT
server.listen(port, () =>
  console.log(`\n-----Listening on port ${port}-----\n`)
)
