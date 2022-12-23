function getRandomValue(min, max) {
	return Math.floor(Math.random() * (max - min)) + max
}

const app = Vue.createApp({
	data() {
		return {
			monsterHealth: 100,
			playerHealth: 100,
			currentRound: 0,
			winner: null,
			logMessages: [],
		}
	},
	watch: {
		playerHealth(value) {
			if (value <= 0 && this.monsterHealth <= 0) {
				this.winner = 'draw'
			} else if (value <= 0) {
				this.winner = 'monster'
			}
		},
		monsterHealth(value) {
			if (value <= 0 && this.playerHealth <= 0) {
				this.winner = 'draw'
			} else if (value <= 0) {
				this.winner = 'player'
			}
		},
	},
	computed: {
		monsterBarHealth() {
			if (this.monsterHealth < 0) {
				return { width: 0 + '%' }
			}
			return {
				width: this.monsterHealth + '%',
			}
		},
		playerBarHealth() {
			if (this.playerHealth < 0) {
				return { width: 0 + '%' }
			}
			return {
				width: this.playerHealth + '%',
			}
		},
		useSpecialAttack() {
			return this.currentRound % 3 !== 0
		},
	},
	methods: {
		surrender() {
			this.winner = 'monster'
		},
		attackMonster() {
			this.currentRound++
			const attackValue = getRandomValue(5, 12)
			this.monsterHealth -= attackValue
			this.logAction('player', 'attack', attackValue)
			this.attackPlayer()
		},
		attackPlayer() {
			const attackValue = getRandomValue(8, 15)
			this.playerHealth -= attackValue
			this.logAction('monster', 'attack', attackValue)
		},
		specialAttackMonster() {
			this.currentRound++
			const attackValue = getRandomValue(10, 25)
			this.monsterHealth -= attackValue
			this.logAction('player', 'attack', attackValue)
			this.attackPlayer()
		},
		healPlayer() {
			this.currentRound++
			const healValue = getRandomValue(8, 15)
			this.playerHealth += healValue
			if (this.playerHealth + healValue > 100) {
				this.playerHealth = 100
			}
			this.logAction('player', 'heal', healValue)
			this.attackPlayer()
		},
		startGame() {
			this.logMessages = []
			this.playerHealth = 100
			this.monsterHealth = 100
			this.winner = null
			this.currentRound = 0
		},
		logAction(who, what, value) {
			this.logMessages.unshift({
				actionWho: who,
				actionWhat: what,
				actionValue: value,
			})
		},
	},
})

app.mount('#game')
