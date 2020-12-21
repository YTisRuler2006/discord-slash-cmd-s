const Command = require("../structures/Command");
const fetch = require("node-fetch");

module.exports = class Pokemon extends Command {
  constructor() {
    super({
      name: 'pokemon',
      description: 'Lookup information about a Pokémon',
      options: [
        {
          type: 3,
          name: 'pokemon',
          description: 'Name of the pokémon to lookup',
          required: true
        }
      ]
    })
  }

  run(interaction) {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    const pokemon = interaction.data.options.find(o => o.name === 'pokemon').value
    fetch("https://discord.com/api/v8/applications/772437334394011648/guilds/733807204938940447/commands/789176941075759144",{
      method: 'DELETE',
      
    }).then(res => res.json()).then(body => {
      console.log(body)
    })
    fetch(`https://some-random-api.ml/pokedex?pokemon=${pokemon}`).then(res => res.json()).then(body => {
      try {
      interaction.followUp({
        embeds: [{
          description: `${body.description} \n \n **<:AB:759414949721931776> Type :** \`${body.type}\` \n **🔥 Abilities :** \`${body.abilities.join(', ')}\` \n **<:HE:759416559679701034> Height :** \`${body.height}\` \n **<:WE:759416918633087006> Weight :** \`${body.weight}\` \n **<:EXP:759417179514339368> Base Experience :** \`${body.base_experience}\` \n \n **❯❯❯ Statistics : ** \n **<:HP:759414470710657024> HP :** \`${body.stats.hp}\` \n **<:ATK:759417423609856070> Attack :** \`${body.stats.attack}\` \n **<:DF:759418154157211680> Defense :** \`${body.stats.defense}\` \n **⚔️ Special Attack :** \`${body.stats.sp_atk}\` \n **<:SPD:759418717896704060> Special Defense :** \`${body.stats.sp_def}\` \n **⚡ Speed :** \`${body.stats.speed}\` \n **<:TT:759419735489511495> Total :** \`${body.stats.total}\``,
          color: parseInt(color, 16),
          footer: {
            icon_url: `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.png`,
            text: `Sujal Goel#0001 | Requested by ${interaction.member.user.username + "#" + interaction.member.user.discriminator}`
          },
          thumbnail: {
            url: body.sprites.animated
          },
          author: {
            name: body.name + '\'s Info : ',
            icon_url: body.sprites.animated
          }
        }]
      })} catch(err){
        console.log(err)
        interaction.followUp({
          embeds: [{
            description: `<a:wrongggg:755042144539902013> **| This is not a valid Pokemon!**`,
            color: 16711680,
          }]
        })
      }
    })
  }
}