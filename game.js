
const d = document

export default class Game {

   constructor() {
      this.button = d.querySelector('button')
      this.colors = [...d.querySelectorAll('#colors-container > div ')]
      this.audio = d.querySelector('audio')


      this.scoreHTML = d.querySelector('h5:last-of-type')
      this.score = 0

      this.levelHTML = d.querySelector('h5:first-of-type')
      this.level = 1
      this.numOfTurns = Math.round(Math.sqrt(this.level))

      this.isPlaying = false
      this.initialize = true
      this.isColoring = false

      this.aiTurns = []
      this.playerTurns = []

   }



   async activeColor(color) {

      console.log(color)

      return new Promise(resolve => {


         setTimeout(() => color.classList.toggle(`hover-${color.id}`), 200)

         setTimeout(() => {

            this.audio.load()
            this.audio.play()

            resolve(color.classList.toggle(`hover-${color.id}`))
         }, 500)

      })

   }

   async #runMemo() {

      this.isColoring = true

      const currentColor = this.colors[Math.floor(Math.random() * this.colors.length)]

      this.aiTurns.push(currentColor.id)

      for (const colorTurn of this.aiTurns) {

         await this.activeColor(this.colors.find(color => color.id === colorTurn))
      }


      this.isColoring = false

   }


   async checkSequence(playerColor) {

      this.playerTurns.push(playerColor)


      if (this.playerTurns.every((turn, i) => turn === this.aiTurns[i])) {

         if (this.playerTurns.length === this.aiTurns.length) {
            console.log(this.playerTurns, this.aiTurns)

            ++this.level
            this.score += this.level ** 2
            this.playerTurns = []


            this.scoreHTML.textContent = 'Your score is ' + this.score
            this.levelHTML.textContent = 'level ' + this.level

            await this.play()
         }
      } else {
         this.aiTurns = []
         this.playerTurns = []
         this.endGame()
      }


   }

   async play() {

      this.isPlaying = true


      this.button.disabled = true
      this.button.classList.add('button-disabled')


      if (this.level > 1)
         return setTimeout(async () => await this.#runMemo(), 1000)

      await this.#runMemo()
   }


   endGame() {
      alert('You lost!')

      this.level = 1
      this.levelHTML.textContent = 'level ' + this.level
      this.isPlaying = false

      this.button.disabled = false
      this.button.classList.remove('button-disabled')

      this.scoreHTML.textContent = 'Your score was ' + this.score

      this.score = 0

   }
}
