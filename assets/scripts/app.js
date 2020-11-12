ㄥ/大寫是Global的意思
const ATTACK_VALUE = 10
const STTONG_ATTACK_VALUE = 17
const MONSER_VALUE = 14
const HEAL_VALUE = 20
const MODE_ATTACK = 'ATTACK'
const STRONG_MODE_ATTACK = 'STRONG_ATTACK'
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK'
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK'
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK'
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL'
const LOG_EVENT_GAME_OVER = 'GAME_OVER'

//100是給視窗預設
const enteredValue = prompt('Maxlife:  ', '100')
let choseMaxlife = parseInt(enteredValue)
if (isNaN(choseMaxlife) || choseMaxlife <= 0) {
  //給預設
  choseMaxlife = 100;

}
let currentMonsterHealth = choseMaxlife
let currentPlayerHealth = choseMaxlife
let haBonusLife = true
let battleLog = [];
adjustHealthBars(choseMaxlife)

function attackMonster(damagetpye) {
  let attackNowValue = damagetpye === MODE_ATTACK ? ATTACK_VALUE : STTONG_ATTACK_VALUE
  let logEvent =
    damagetpye === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK
  const damage = dealMonsterDamage(attackNowValue)
  currentMonsterHealth -= damage
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth)
  endRound()
}

function reset() {
  currentPlayerHealth = choseMaxlife;
  currentMonsterHealth = choseMaxlife;
  resetGame(choseMaxlife);
}


function endRound() {
  const initialPlayerHealth = currentPlayerHealth
  const playerDamge = dealPlayerDamage(MONSER_VALUE)
  currentPlayerHealth -= playerDamge

  writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamge, currentMonsterHealth, currentPlayerHealth)
  if (currentPlayerHealth <= 0 && haBonusLife) {

    haBonusLife = false
    removeBonusLife()
    currentPlayerHealth = initialPlayerHealth
    alert('You use bonus life')
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You Won!!')
    writeToLog(LOG_EVENT_MONSTER_ATTACK, 'PLAYER WON', currentMonsterHealth, currentPlayerHealth)

  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert('You lost!!')
    writeToLog(LOG_EVENT_MONSTER_ATTACK, 'MONSTER WON', currentMonsterHealth, currentPlayerHealth)

  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {

    alert('Draw')
    writeToLog(LOG_EVENT_MONSTER_ATTACK, 'A DRAW', currentMonsterHealth, currentPlayerHealth)

  }
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0)
    reset()

}

function HealHander() {
  let healValue = HEAL_VALUE
  //會補超過血
  if (currentPlayerHealth >= choseMaxlife - HEAL_VALUE) {
    alert('You have Max health')
    healValue = choseMaxlife - currentPlayerHealth

  }
  increasePlayerHealth(healValue)
  currentPlayerHealth += healValue
  writeToLog(LOG_EVENT_PLAYER_HEAL, HEAL_VALUE, currentMonsterHealth, currentPlayerHealth)

  ///endRound()
}

function attackHander() {
  attackMonster(MODE_ATTACK)
}

function syringAttackHander() {
  attackMonster(STRONG_MODE_ATTACK)
}
//event,value
function writeToLog(ev, va, monsterHealth, playerHealth) {
  let logEntry;
  logEntry = {
    event: ev,
    value: va,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth
  }
  switch (ev) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.tagert = 'MONSTER'
      break
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.tagert = 'PLAYER'
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.tagert = 'PLAYER'
      break

  }
  battleLog.push(logEntry)
}
let i = 0

function showLog() {
  for (const log of battleLog) {
    console.log(`#${i}`)
    for (const key in log) {
      console.log(`${key}==>${log[key]}`)
    }
    i++
  }

  //console.log(battleLog)
}
attackBtn.addEventListener('click', attackHander)
strongAttackBtn.addEventListener('click', syringAttackHander)
healBtn.addEventListener('click', HealHander)
logBtn.addEventListener('click', showLog)