'use strict';

const debug = require('debug')('int-exp:model');
const uuid = require('uuid');
const {fmtJson} = require('./util');
const {Operations} = require('./operation');

// Model
//   may house some properties that only matter to it internally
//   may support some Operations
//   so perhaps a question is what other model types does this
//   model know or care about.
//   that should be expressed in such a way as to manage
//   compatibility among models -- so they can subclass each
//   other, etc. so we have the concept of interfaces?
//   What should the semantics be for operations?
//   Well, what kind of operations are we talking about?
//   Transformations over time;
//   Explorations of the space of possibilities of various
//   histories of interactions and transformations--
//   So for that, either the model itself would be responsible
//   for keeping track of and reporting its history,
//   or the framework should do so.
//   For the framework to do it, the model needs to follow
//   some kind of standard pattern so that its range of
//   possible states can be represented coherently by the
//   framework.
//   OK so operations on a model should be defined functionally.
//   The model itself should be defined in a stateless fashion;
//   so the model should define a function for each supported
//   operation, the function taking the model itself as an input
//   and then whatever other inputs are needed for that
//   particular operation? Operations could further be defined
//   by what events may trigger them, and conditions that
//   must be met in order for the operation to be applied.
//   Here we have a concept similar to erlang's pattern matching
//   Again for this to work there will need to be a consistent
//   basic representation of properties that can be evaluated
//   in such conditional expressions.

class Model {
  constructor(name) {
    this.id = uuid();
    this.name = name;
    this.operations = new Operations();
    this.setOperation = this.operations.set.bind(this.operations);
    this.getOperation = this.operations.get.bind(this.operations);
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getOperations() {
    return this.operations;
  }
  operate(name, state, args) {
    debug(`Model.operate(${name}), state: ` + fmtJson(state.getObj()));
    return this.getOperation(name).operate(state, args); // TODO variadic?
  }
  // TODO? defineRelationship() {}
}

module.exports = {
  Model,
};
