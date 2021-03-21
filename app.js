import Game from './game.js'

const game = new Game()



game.colors.forEach(
   box => box.addEventListener('click', function () {

      if (!game.isPlaying)
         return alert('You must click the button to start to play')

      game.audio.load()
      game.audio.play()
      game.checkSequence(this.id)

   })
)


game.button.addEventListener('click', async function () {

   if (!game.isPlaying) await game.play()

})