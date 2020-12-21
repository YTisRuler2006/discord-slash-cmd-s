const Command = require("../structures/Command");
const fetch = require("node-fetch")

module.exports = class docs extends Command {
  constructor() {
    super({
      name: 'cat',
      description: 'Get a random cat image',
    })
  }

  async run(interaction) {
    await fetch("https://api.thecatapi.com/v1/images/search")
      .then(res => res.json())
      .then(data => {
        console.log(data)
        interaction.followUp({
          content: data[0].url
        })
      })
  }
}