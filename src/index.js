import {Subject, fromEvent} from 'rxjs'
import {scan, startWith, shareReplay} from 'rxjs/operators'

const decksInitial = 8;
const initialState = {
  counter: 0,
  decks: decksInitial,
  decksPlayed: 0,
  lastCard: 'none',
  card_2: decksInitial * 4,
  card_3: decksInitial * 4,
  card_4: decksInitial * 4,
  card_5: decksInitial * 4,
  card_6: decksInitial * 4,
  card_7: decksInitial * 4,
  card_8: decksInitial * 4,
  card_9: decksInitial * 4,
  card_10: decksInitial * 4 * 5
}

const addInitialState = {
  win: 0,
  loose: 0,
  games: 0
}

const getDecksPlayed = (state) => {
  const decksRemain = state.decks - state.decksPlayed;
  if ((state.card_2 / 4) < decksRemain) {
    if ((state.card_3 / 4) < decksRemain) {
      if ((state.card_4 / 4) < decksRemain) {
        if ((state.card_5 / 4) < decksRemain) {
          if ((state.card_6 / 4) < decksRemain) {
            if ((state.card_7 / 4) < decksRemain) {
              if ((state.card_8 / 4) < decksRemain) {
                if ((state.card_9 / 4) < decksRemain) {
                  if ((state.card_10 / 20) <= decksRemain-0.25) {
                    return state.decksPlayed + 0.25;
                  }
                }  
              }
            }
          }
        }
      }
    }
  }

  return state.decksPlayed;
}

const pre = document.querySelector('pre')
const lastCard = document.getElementById('lastCard')
const statistic = document.getElementById('statistic')
const card_2_remains = document.getElementById('card_2_remains')
const card_3_remains = document.getElementById('card_3_remains')
const card_4_remains = document.getElementById('card_4_remains')
const card_5_remains = document.getElementById('card_5_remains')
const card_6_remains = document.getElementById('card_6_remains')
const card_7_remains = document.getElementById('card_7_remains')
const card_8_remains = document.getElementById('card_8_remains')
const card_9_remains = document.getElementById('card_9_remains')
const card_10_remains = document.getElementById('card_10_remains')

const handlers = {
  Card_2: state => {
    const newState = {...state, counter: state.counter + 1, lastCard: '2', card_2: state.card_2 - 1}
    return {...newState, decksPlayed: getDecksPlayed(newState) }
  },
  Card_3: state => {
    const newState = {...state, counter: state.counter + 2, lastCard: '3', card_3: state.card_3 - 1}
    return {...newState, decksPlayed: getDecksPlayed(newState) }
  },
  Card_4: state => {
    const newState = {...state, counter: state.counter + 2, lastCard: '4', card_4: state.card_4 - 1}
    return {...newState, decksPlayed: getDecksPlayed(newState) }
  },
  Card_5: state => {
    const newState = {...state, counter: state.counter + 3, lastCard: '5', card_5: state.card_5 - 1}
    return {...newState, decksPlayed: getDecksPlayed(newState) }
  },
  Card_6: state => {
    const newState = {...state, counter: state.counter + 2, lastCard: '6', card_6: state.card_6 - 1}
    return {...newState, decksPlayed: getDecksPlayed(newState) }
  },
  Card_7: state => {
    const newState = {...state, counter: state.counter + 1, lastCard: '7', card_7: state.card_7 - 1}
    return {...newState, decksPlayed: getDecksPlayed(newState) }
  },
  Card_8: state => {
    const newState = {...state, counter: state.counter, lastCard: '8', card_8: state.card_8 - 1}
    return {...newState, decksPlayed: getDecksPlayed(newState) }
  },
  Card_9: state => {
    const newState = {...state, counter: state.counter - 1, lastCard: '9', card_9: state.card_9 - 1}
    return {...newState, decksPlayed: getDecksPlayed(newState) }
  },
  Card_10: state => {
    const newState = {...state, counter: state.counter - 2, lastCard: '10/A', card_10: state.card_10 - 1}
    return {...newState, decksPlayed: getDecksPlayed(newState) }
  },
  WIN: state => ({...state, win: state.win + 1, games: state.games + 1}),
  LOOSE: state => ({...state, loose: state.loose + 1, games: state.games + 1}),
  SHUFFLE: state => ({...state, ...initialState}),
  DEFAULT: state => state
}

function reducer(state = {...initialState, ...addInitialState}, action) {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}

function createStore(rootReducer) {
  const subj$ = new Subject()

  const store$ = subj$.pipe(
    startWith({type: '__INIT__'}),
    scan(rootReducer, undefined),
    shareReplay(1)
  )

  store$.dispatch = action => subj$.next(action)

  return store$
}

const store$ = createStore(reducer)

store$.subscribe(state => {
  pre.innerHTML = 'Count: ' + state.counter / 2 + ' | True count: ' + (state.counter / (state.decks-state.decksPlayed)).toFixed(2) + ' | Last card: ' + state.lastCard;
  statistic.innerHTML = 'Games: ' + state.games + ' | Win: ' + (Math.round((state.win / state.games)*100) || 0) + '% | Loose: ' + (Math.round((state.loose / state.games)*100) || 0) + '%'
  card_2_remains.innerHTML = state.card_2;
  card_3_remains.innerHTML = state.card_3;
  card_4_remains.innerHTML = state.card_4;
  card_5_remains.innerHTML = state.card_5;
  card_6_remains.innerHTML = state.card_6;
  card_7_remains.innerHTML = state.card_7;
  card_8_remains.innerHTML = state.card_8;
  card_9_remains.innerHTML = state.card_9;
  card_10_remains.innerHTML = state.card_10;
})

document.getElementById('c_2').addEventListener('click', () => {
  store$.dispatch({type: 'Card_2'})
})

document.getElementById('c_3').addEventListener('click', () => {
  store$.dispatch({type: 'Card_3'})
})

document.getElementById('c_4').addEventListener('click', () => {
  store$.dispatch({type: 'Card_4'})
})

document.getElementById('c_5').addEventListener('click', () => {
  store$.dispatch({type: 'Card_5'})
})

document.getElementById('c_6').addEventListener('click', () => {
  store$.dispatch({type: 'Card_6'})
})

document.getElementById('c_7').addEventListener('click', () => {
  store$.dispatch({type: 'Card_7'})
})

document.getElementById('c_8').addEventListener('click', () => {
  store$.dispatch({type: 'Card_8'})
})

document.getElementById('c_9').addEventListener('click', () => {
  store$.dispatch({type: 'Card_9'})
})

document.getElementById('c_10').addEventListener('click', () => {
  store$.dispatch({type: 'Card_10'})
})

document.getElementById('shuffle_btn').addEventListener('click', () => {
  store$.dispatch({type: 'SHUFFLE'})
})

const keydown$ = fromEvent(document, 'keyup');
keydown$.subscribe(($event) => {
        switch($event.code) {
          case 'Digit2':
            store$.dispatch({type: 'Card_2'})
            break;
          case 'Digit3':
            store$.dispatch({type: 'Card_3'})
            break;
          case 'Digit4':
            store$.dispatch({type: 'Card_4'})
            break;
          case 'Digit5':
            store$.dispatch({type: 'Card_5'})
            break;
          case 'Digit6':
            store$.dispatch({type: 'Card_6'})
            break;
          case 'Digit7':
            store$.dispatch({type: 'Card_7'})
            break;
          case 'Digit8':
            store$.dispatch({type: 'Card_8'})
            break;
          case 'Digit9':
            store$.dispatch({type: 'Card_9'})
            break;
          case 'Digit0':
            store$.dispatch({type: 'Card_10'})
            break;
          case 'KeyR':
            store$.dispatch({type: 'SHUFFLE'})
            break;
          case 'KeyW':
            store$.dispatch({type: 'WIN'})
            break;
          case 'KeyL':
            store$.dispatch({type: 'LOOSE'})
            break;
          default:
            console.log($event);
            break;
        }
    });