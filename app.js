//damage/heal calculator
const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min)


const app = Vue.createApp({
    //state
    data() {
        return {
            monsterHealth: 100,
            userHealth: 100,
            userLevel: 2,
            specialAttackReady: true, //toggled
            battleLog: [],
            userSpell: '',
            spellChant: false,
            chantChallenge: 'Example Chant',
            spellData: {
                fireSpell: {
                    chant: 'Fire wraiths, blasting rage!',
                    minDamage: 15,
                    maxDamage: 18,
                    time: 4000,
                },
                stoneStun: {
                    chant: 'Stone spirits, come forth!',
                    chance: 50,
                    minDamage: 20,
                    maxDamage: 30,
                    time: 4000,
                },
                waterBender: {
                    chant: 'Water, heal me!',
                    minDamage: 20,
                    maxDamage: 30,
                    time: 4000,
                },
                monsterDamage: {
                    minDamage: 17,
                    maxDamage: 19,
                }
            }, //will be modified
            spellTimer: 4,
            readyTimer: 1,
        }
    },
    //functions
    methods: {
        defaultCondition() {
            this.spellChant= false;
            this.chantChallenge= '';
            this.userSpell = '';
        },
        timerDisplay() {
                setInterval(() => {
                    if(this.spellTimer > 0) {
                        this.spellTimer--
                        console.log(this.spellTimer)
                    }
                }, 1000)
        },
        userInputChant(e) {
           this.userSpell = e.target.value;
        },
        userAttack() { //fire attack
            const {fireSpell} = this.spellData;
            this.chantChallenge = fireSpell.chant;
            this.spellTimer = fireSpell.time/1000;
            setTimeout(() => {
                if(this.userSpell === this.chantChallenge) {
                const userDamage = getRandomNumber(fireSpell.minDamage, fireSpell.maxDamage);
                 this.battleLog.push(`user attack with fire: ${userDamage} damage`)
                 this.monsterHealth = this.monsterHealth - userDamage; 
                 
                }else {
                    this.battleLog.push('User failed to chant FIRE spell')
                }
                this.defaultCondition();
            },fireSpell.time)
            // this.spellChant = false;
            return this.monsterHealth
        },
        monsterAttack(time) {
            const {monsterDamage} = this.spellData;
            setTimeout(() => {
              const damage = getRandomNumber(monsterDamage.minDamage, monsterDamage.maxDamage) ;
              this.battleLog.push(`Monster damage is ${damage}`);
            this.userHealth = this.userHealth - damage;
            return this.userHealth  
            }, time)
            
        },
        specialAttack() {
            const {stoneStun} = this.spellData
            this.chantChallenge = stoneStun.chant
            this.spellTimer = stoneStun.time/1000;
            setTimeout(() => {
                if(this.userSpell === this.chantChallenge) {
                    const calculateStunChance = getRandomNumber(0, 100) ;
            const specialDamage = getRandomNumber(stoneStun.minDamage, stoneStun.maxDamage);
            if(calculateStunChance > stoneStun.chance) {
                this.battleLog.push('Enemy Stunned, skipped the round');
                this.monsterHealth = this.monsterHealth - specialDamage;
                this.defaultCondition();
                return this.monsterHealth;
            } else {
                this.battleLog.push('Stun Failed');
                this.monsterHealth = this.monsterHealth - specialDamage;
                this.battleLog.push(`monster health is ${this.monsterHealth}`)
                this.monsterAttack(500);
                this.defaultCondition();
            if(this.userHealth <= 0) {
                this.battleLog.push('YOU DIED');
            }
            }
            }else {
                    this.battleLog.push('User failed to chant FIRE spell');
                    this.monsterAttack(500);
                }
                this.defaultCondition();
            }, stoneStun.time)
        },
        userHeal() {
            const {waterBender} = this.spellData;
            this.chantChallenge = waterBender.chant;
            this.spellTimer = waterBender.time/1000;
            setTimeout(() => {
                if(this.userSpell === this.chantChallenge) {
            const userHealPoint = getRandomNumber(waterBender.minDamage, waterBender.maxDamage);
            this.battleLog.push(`You Heal is ${userHealPoint} point`);
            this.userHealth += userHealPoint;
            console.log(`Your Health is now ${this.userHealth}`);
            this.monsterAttack(500);
            this.defaultCondition()
                } else {
                    this.battleLog.push('User failed to chant Water Bender');
                    this.monsterAttack(500);
                    this.defaultCondition()
                }
            }, waterBender.time)
        },
        inputAutoFocus(event) {
            console.log(event)
        },
        //dipisahin for another usage
        userChooseAttack() {
            this.spellChant = true;
            // inputAutoFocus();
            this.timerDisplay();
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
            this.spellChant = true;
            this.specialAttack(4000);
            this.specialAttackReady = !this.specialAttackReady;
        },
        userChooseHeal() {
            this.spellChant = true;
            this.userHeal();
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
        },
        timerFunction() {//for making timer
            if (this.spellTimer > 0) {
                return this.displayTimer = true;
            }
        },
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

/*
To Dos:
1. bikin timer v
2. bikin tutorial
*/

