const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "imageai",
  description: "create an AI image",
  type: 1,
  options: [

  {

    name: "prompt",
    description: "prompt to produce image",
    type: 3,
    required: true  

  }

  ],
  run: async (client, interaction) => {
    const { default: midjourney } = await import("midjourney-client");
        const resim2 = interaction.options.getString('prompt');
    
            if (!resim2) {
          return interaction.reply({ content: 'Bilgi istemi seçeneği sağlanmadı.', ephemeral: true });
        }
    

          await interaction.reply("Resim oluşturuluyor... %50").then((msg) => setTimeout(() => { msg.edit('Resim oluşturuluyor... %100')}, 4000))
          const cevap = await midjourney(resim2);

          const resim = cevap.join("\n");
          interaction.editReply({
            content: `> ${resim2}\n<@${interaction.user.id}> **Resmi Oluşturan**`,
            embeds: [
              {
                image: { url: resim },
                footer: { text: `Çizen kişi ${interaction.user.tag}`, iconURL: interaction.user.avatarURL() },
              },
            ],
          });
        }
    }

