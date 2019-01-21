'use strict';

const debug = require('debug')('int-exp:scene');
const _ = require('lodash');
const {fmtJson} = require('./util');
const {StatesHistory} = require('./history');
const {Properties} = require('./property');
const {Model} = require('./model');

class Scene {
  constructor() {
    this.statesHistory = new StatesHistory();
    this.workingStates = {}; // model id -> model state
  }

  getStatesHistory() {
    return this.statesHistory;
  }

  getCurrentState(model) {
    let state = this.workingStates[model.getId()];
    if (!state) {
      state = new Properties();
    }
    return state;
  }

  setCurrentState(model, state) {
    this.workingStates[model.getId()] = state;
  }

  operate(name, model, args) {
    let state = this.getCurrentState(model);
    debug(`Scene.operate(${name} before, state: ` + fmtJson(state.getObj()));
    let stateNew = model.operate(name, state, args);
    debug(`Scene.operate(${name} after, state: ` + fmtJson(state.getObj()));
    debug(`Scene.operate(${name} after, stateNew: ` + fmtJson(stateNew.getObj()));
    if (!_.isEqual(state, stateNew)) {
      this.statesHistory.append(model, stateNew);
    }
    this.setCurrentState(model, stateNew);
  }
}

module.exports = {
  Scene
};
