import {Subject} from 'rxjs'
import {scan, startWith, shareReplay} from 'rxjs/operators'

const initialState = {
  counter: 0
}

const pre = document.querySelector('pre')

const handlers = {
  Card_2: state => ({...state, counter: state.counter + 1}),
  Card_3: state => ({...state, counter: state.counter + 2}),
  Card_4: state => ({...state, counter: state.counter + 2}),
  Card_5: state => ({...state, counter: state.counter + 3}),
  Card_6: state => ({...state, counter: state.counter + 2}),
  Card_7: state => ({...state, counter: state.counter + 1}),
  Card_8: state => ({...state, counter: state.counter}),
  Card_9: state => ({...state, counter: state.counter - 1}),
  Card_10: state => ({...state, counter: state.counter - 2}),
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
  pre.innerHTML = (state.counter / 6).toFixed(2);
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