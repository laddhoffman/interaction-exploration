'use strict';

const {fmtJson} = require('./util');
const {Scene} = require('./scene');
const {Model} = require('./model');
const {Actor, Condition} = require('./dev');

// Models
//   "what can happen"
//   "actors and their propensities"
//   "a given possible sequence of events"
//   "desired constraints upon sequences of events"

// of course here we have considerations of code vs data.
// logic could be encapsulated within framework and
// models could be entirely defined as data;
// logic could be encapsulated within models;
// data could be left up to models to exchange free-form
// or with conditions enforced or schemas exchanged directly;
// data could be constrained and managed by the framework
// by imposing schemas to enforce syntax.
// said another way,
// semantics can be managed by the framework and/or the models
// syntax can be managed by the framework and/or models

// framework design considerations:
// consistency -- enabling coherent representation of complex models/algorithms.
// flexibility -- we're not too concerned with modifiability of core concepts,
// because those are based on fairly well-reasoned principles; instead, we are
// concerned with facilitating the expression of these core conceps as they
// apply to any specific problem of interest. As such we need to keep an eye
// toward allowing flexible implementations of models. So we need to keep
// a small core interface that isn't overly specialized;
// on top of this it may be possible to layer more specialized interfaces.

// framework design goal:
// construct a set of abstractions that effectively represents the concepts of
// interest, and encapsulates those representations so that other ideas can be
// expressed in conjunction -- alongside or instead.


// how should sample code look in this framework?
// some brainstorming ideas:

class MyActor extends Actor {
  constructor() {
    super();
    this.setOperation('changeColor', (state, args) => {
      state.setProperty('color', args.color);
    });
  }
}


(function() {
  var actor1 = new MyActor();
  var scene = new Scene();
  actor1.setOperation('changeColor', (state, args) => {
    state.set('color', args.color);
  });

  scene.operate('changeColor', actor1, {color: 'blue'});
  console.log('main task, state 1: ' +
    fmtJson(scene.getCurrentState(actor1).getObj()));

  scene.operate('changeColor', actor1, {color: 'blue'});
  console.log('main task, state 2: ' +
    fmtJson(scene.getCurrentState(actor1).getObj()));

  scene.operate('changeColor', actor1, {color: 'red'});
  console.log('main task, state 3: ' +
    fmtJson(scene.getCurrentState(actor1).getObj()));

  // let condition1 = new Condition(scene.getCurrentState(actor1));

  let statesHistory = scene.getStatesHistory();
  console.log('statesHistory: ' + fmtJson(statesHistory.getAll()));

})();

