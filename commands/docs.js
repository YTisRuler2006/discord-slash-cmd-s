const Command = require("../structures/Command");
const fetch = require("node-fetch")

module.exports = class docs extends Command {
  constructor() {
    super({
      name: 'docs',
      description: 'Search for a query over Discord.js official docs',
      options: [
        {
          type: 3,
          name: 'query',
          description: 'Your Search query',
          required: true
        }
      ]
    })
  }

  async run(interaction) {
    const query = interaction.data.options.find(o => o.name === 'query').value
    await fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${query}`).then(res => res.json()).then((embed) => {
      if (embed && !embed.error) {
        interaction.followUp({
          embeds: [embed]
        })
      } else {
        interaction.followUp({
          embeds: [{
            description: `<a:Wrongg:780521744481779755> **| Couldn't find any thing related to \`${query}\`**`,
            color: 15747399,
          }]
        })
      }
    }).catch((err) => {
      interaction.followUp({
        embeds: [{
          description: `<a:Wrongg:780521744481779755> **| There was an error while sending the message!\`**`,
          color: 15747399,
        }]
      })
    })
  }
}