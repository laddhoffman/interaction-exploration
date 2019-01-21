'use strict';

const debug = require('debug')('int-exp:operation');
const {fmtJson} = require('./util');

class Operation {
  constructor(func) {
    this.func = func;
  }
  operate(state, args) {
    let stateMut = state.clone();
    debug('Operation.operate(), state: ' + fmtJson(state.getObj()));
    debug('Operation.operate(), stateMut: ' + fmtJson(stateMut.getObj()));
    this.func(stateMut, args);
    return stateMut;
  }
}

class Operations {
  constructor() {
    this.operations = {};
  }
  set(name, func) {
    debug(`Operations.set(${name})`)
    this.operations[name] = new Operation(func);
  }
  get(name) {
    debug(`Operations.get(${name})`)
    return this.operations[name];
  }
  getNames() {
    return Object.keys(this.operations);
  }
}

module.exports = {
  Operation,
  Operations,
};
