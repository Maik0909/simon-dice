import Game from './game.js'

const game = new Game()

const d = document
const button = d.querySelector('button')
const audio = d.querySelector('audio')



game.colors.forEach(
   box => box.addEventListener('click', function () {
      audio.load()
      audio.play()
      game.checkSequence(this.id)
   })
)


button.addEventListener('click', async function () {

   if (!game.isPlaying) {
      await game.play()
   }


})