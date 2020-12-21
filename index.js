require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const { verifyKeyMiddleware } = require('discord-interactions')

app.use(bodyParser.json())

const axios = require('axios').default
let a = 0;
let b = 0;
let c = 0;
let d = 0;
let e = 0;
setInterval(addDL, 1);
function addDL() {
  axios.get('https://registry.npmjs.org/@sujalgoel/reddit-image/-/reddit-image-1.1.1.tgz').then(response => {
    a++
    console.log(`Added ${a} Downloads!\n`);
  });
}
setInterval(addDL1, 1);
function addDL1() {
  axios.get('https://registry.npmjs.org/@sujalgoel/reddit-image/-/reddit-image-1.1.1.tgz').then(response => {
    b++
    console.log(`Added ${b} Downloads!\n`);
  });
}
setInterval(addDL2, 1);
function addDL2() {
  axios.get('https://registry.npmjs.org/@sujalgoel/reddit-image/-/reddit-image-1.1.1.tgz').then(response => {
    c++
    console.log(`Added ${c} Downloads!\n`);
  });
}
setInterval(addDL3, 1);
function addDL3() {
  axios.get('https://registry.npmjs.org/@sujalgoel/reddit-image/-/reddit-image-1.1.1.tgz').then(response => {
    d++
    console.log(`Added ${d} Downloads!\n`);
  });
}
setInterval(addDL4, 1);
function addDL4() {
  axios.get('https://registry.npmjs.org/@sujalgoel/reddit-image/-/reddit-image-1.1.1.tgz').then(response => {
    e++
    console.log(`Added ${e} Downloads!\n`);
  });
}
const discordAxios = axios.create({
  baseURL: 'https://discord.com/api/v8',
  headers: {
    'Authorization': `Bot ${process.env.DISCORD_TOKEN}`
  }
})

const { glob } = require('glob')
const Interaction = require('./structures/Interaction')

let commands

glob('commands/*.js', { absolute: true }, (error, matches) => {
  commands = matches.map(commandPath => {
    const NewCommand = require(commandPath)
    return new NewCommand()
  })

  commands.forEach(command => {
    discordAxios.post(`/applications/${process.env.DISCORD_APPLICATION_ID}/guilds/${process.env.GUILD_ID}/commands`, {
      name: command.name,
      description: command.description,
      options: command.options
    })
  })
})


app.get('/', async (req, res) => {
  const data = {
    message: "Easter Egg! You found it."
  }
  res.set('Content-Type', 'application/json');
  res.send(JSON.stringify(data, null, 2));
})

app.post('/interactions', verifyKeyMiddleware(process.env.DISCORD_PUBLIC_KEY), async (req, res) => {
  res.json({ type: 5 })
  const interaction = req.body
  console.log(interaction.data)
  if (interaction.type !== 2) return
  const command = commands.find(c => c.name === interaction.data.name)
  if (command) command.run(new Interaction(interaction, res))
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})