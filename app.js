//damage/heal calculator
const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min)


const app = Vue.createApp({
    //state
    data() {
        return {
            monsterHealth: 100,
            userHealth: 100,
            specialAttackReady: true, //toggled
            battleLog: [],
            userSpell: '',
            spellChant: false,
            chantChallenge: 'Example Chant',
        }
    },
    //functions
    methods: {
        userInputChant(e) {
           this.userSpell = e.target.value;

        },
        userAttack(time) { //fire attack
            this.spellChant = true;
            this.chantChallenge = 'Fire, Attack Forward!'
            setTimeout(() => {
                if(this.userSpell === this.chantChallenge) {
                const userDamage = getRandomNumber(15, 18);
                 this.battleLog.push(`user attack with fire: ${userDamage} damage`)
                 this.monsterHealth = this.monsterHealth - userDamage; 
                 
                }else {
                    this.battleLog.push('User failed to chant FIRE spell')
                }
                this.spellChant = false;
            },time)
            // this.spellChant = false;
            return this.monsterHealth
        },
        monsterAttack(time) {
            setTimeout(() => {
              const monsterDamage = getRandomNumber(17, 19) ;
              this.battleLog.push(`Monster damage is ${monsterDamage}`);
            this.userHealth = this.userHealth - monsterDamage;
            return this.userHealth  
            }, time)
            
        },
        specialAttack(time) {
            this.spellChant = true;
            this.chantChallenge = 'Stone Stun!'
            setTimeout(() => {
                if(this.userSpell === this.chantChallenge) {
                    const calculateStunChance = getRandomNumber(0, 100) ;
            const specialDamage = getRandomNumber(20, 30);
            if(calculateStunChance > 85) {
                this.battleLog.push('Enemy Stunned, skipped the round');
                this.monsterHealth = this.monsterHealth - specialDamage;
                this.battleLog.push(`monster health is ${this.monsterHealth}`)
                return this.monsterHealth;
            } else {
                this.battleLog.push('Stun Failed');
                this.monsterHealth = this.monsterHealth - specialDamage;
                this.battleLog.push(`monster health is ${this.monsterHealth}`)
                this.monsterAttack(500);
            if(this.userHealth <= 0) {
                this.battleLog.push('YOU DIED');
            }
            }
            }else {
                    this.battleLog.push('User failed to chant FIRE spell');
                    this.monsterAttack(500);
                }
                this.spellChant = false;
            }, time)
        },
        //dipisahin for another usage
        userChooseAttack() {
            this.userAttack(4000);
            if(this.monsterHealth <= 0) {
                console.log('Monter died, go on to the next battle');
            } else {
                this.monsterAttack(4500);
            if(this.userHealth <= 0) {
                console.log('YOU DIED');
            }
            }
            this.specialAttackReady = true;
        },
        userSpecialAttack() {
            this.specialAttack(4000);
            this.specialAttackReady = !this.specialAttackReady;
        },
        userHeal() {
            const userHealPoint = getRandomNumber(20, 30);
            console.log(`You Heal is ${userHealPoint} point`)
            this.userHealth += userHealPoint;
            console.log(`Your Health is now ${this.userHealth}`)
            this.monsterAttack(500);
            this.specialAttackReady = true;
        },
        restartGame() {
                this.monsterHealth = 100;
                this.userHealth = 100;
                this.battleLog = [];
                this.specialAttackReady = true;
        },
        userSurrender() {
                if(confirm('You Sure?')) {
                alert('Noob')
                this.restartGame()
                }
                this.specialAttackReady = true;
        }
    },
    //dynamic stylings
    computed: {
        monsterHealthStyle() {
            return {width: this.monsterHealth + '%'}
        },
        userHealthStyle() {
            return {width: this.userHealth + '%'}
        },
        specialAttackStyle() {
            if(!this.specialAttackReady) {
                return {backgroundColor: 'black'}
            }
        }
    },
    watch: {
        userHealth() {
            if(this.userHealth <= 0) {
                this.userHealth = 0;
                alert('YOU DIED');
                this.restartGame();
                location.reload();
            } else if (this.userHealth > 100) {
                this.userHealth = 100;
            }
        },
        monsterHealth() {
            if(this.monsterHealth <=0) {
                this.monsterHealth = 0
                alert('Monster died, go on to the next battle');
                this.restartGame();
                location.reload();
            } else if (this.monsterHealth > 100) {
                this.monsterHealth = 100;
            }
        }
    }

})

app.mount('#game');

