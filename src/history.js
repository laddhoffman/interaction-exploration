'use strict';

const debug = require('debug')('int-exp:history');
const uuid = require('uuid');
const {fmtJson} = require('./util');
  
// One thing we can consider doing is: storing a "denormalized" history
// of states and then traversing it later to build pictures of what happened.
// Do we want to allow for the concept of simultaneity, or use "realtime"
// for everything?
// Probably realtime.

class StatesHistory {
  constructor() {
    this.statesHistory = [];
  }
  append(model, state) {
    let id = uuid();
    this.statesHistory.push({
      id,
      modelId: model.getId(),
      timestamp: new Date(),
      state: state.getObj(),
    });
    return id;
  }
  get(id) {
    return this.states.find(state => state.id === id);
  }
  getAll(id) {
    if (id) {
      return this.statesHistory.filter(state => state.id === id);
    }
    return this.statesHistory;
  }
}

module.exports = {
  StatesHistory,
};
