import {Subject, fromEvent} from 'rxjs'
import {scan, startWith, shareReplay} from 'rxjs/operators'

const initialState = {
  counter: 0,
  lastCard: 'none'
}

const pre = document.querySelector('pre')
const lastCard = document.getElementById('lastCard')

const handlers = {
  Card_2: state => ({...state, counter: state.counter + 1, lastCard: '2'}),
  Card_3: state => ({...state, counter: state.counter + 2, lastCard: '3'}),
  Card_4: state => ({...state, counter: state.counter + 2, lastCard: '4'}),
  Card_5: state => ({...state, counter: state.counter + 3, lastCard: '5'}),
  Card_6: state => ({...state, counter: state.counter + 2, lastCard: '6'}),
  Card_7: state => ({...state, counter: state.counter + 1, lastCard: '7'}),
  Card_8: state => ({...state, counter: state.counter, lastCard: '8'}),
  Card_9: state => ({...state, counter: state.counter - 1, lastCard: '9'}),
  Card_10: state => ({...state, counter: state.counter - 2, lastCard: '10/A'}),
  SHUFFLE: state => ({...state, counter: 0, lastCard: 'none'}),
  DEFAULT: state => state
}

function reducer(state = initialState, action) {
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
  pre.innerHTML = 'Count: ' + state.counter / 2 + ' | True count: ' + (state.counter / 6).toFixed(2) + ' | Last card: ' + state.lastCard;
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
          default:
            console.log($event);
            break;
        }
    });