const Command = require("../structures/Command");
const fetch = require("node-fetch")

module.exports = class docs extends Command {
  constructor() {
    super({
      name: 'dog',
      description: 'Get a random dog image',
    })
  }

  async run(interaction) {
    await fetch("https://dog.ceo/api/breeds/image/random")
    .then(res => res.json())
    .then(data => {
    interaction.followUp({
      content: data.message
    })})
  }
}