'use strict';

const uuid = require('uuid');

// Models
//   "what can happen"
//   "actors and their propensities"
//   "a given possible sequence of events"
//   "desired constraints upon sequences of events"

// of course here we have considerations of
// code vs data.
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

// reasons to favor one strategy over the other?
// modifiability
// consistency
// flexibility

// we want to construct a set of abstractions that
// effectively represents the concepts of interest,
// and does its best to encapsulate those representations
// so that other ideas can be expressed in conjunction:
// alongside or instead.

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

// maybe not useful
class Obj {
  constructor() {
  }
}

// maybe not useful
class Func {
  constructor() {
  }
}

class Property {
  set(value) {
    this.value = value;
  }
  get() {
    return this.value;
  }
}

class Properties {
  constructor() {
    this.properties = {};
  }
  set(name, value) {
    let property = new Property();
    property.set(value);
    this.properties[name] = property;
  }
  get(name) {
    let property = this.properties[name];
    return property.get();
  }
  getNames() {
    return Object.keys(this.properties);
  }
  getAll() {
    this.getNames.map(name => {
      return {
        name,
        value: this.get(name),
      };
    });
  }
}

class Operation {
  constructor(func) {
    this.func = func;
  }
  operate(state, args) {
    this.func(state, args);
    return state;
  }
}

class Operations {
  constructor() {
    this.operations = {};
  }
  set(name, func) {
    console.log(`Operations, set(${name})`)
    this.operations[name] = new Operation(func);
  }
  get(name) {
    console.log(`Operations, get(${name})`)
    return this.operations[name];
  }
  getNames() {
    return Object.keys(this.operations);
  }
}

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
    return this.getOperation(name).operate(state, args); // TODO variadic?
  }
  // TODO? defineRelationship() {}
}

class Event extends Model {
  constructor() {
    super('event');
  }
}

class Actor extends Model {
  constructor() {
    super('actor');
  }
}

class Message extends Model {
  constructor() {
    super('message');
  }
}

class EventSequence extends Model {
  constructor() {
    super('eventSequence');
  }
}

class Constraint extends Model {
  constructor() {
    super('constraint');
  }
}

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
      state,
    });
    return id;
  }
  get(id) {
    return this.states.find(state => state.id === id);
  }
}

// One thing we can consider doing is: storing a "denormalized" history
// of states and then traversing it later to build pictures of what happened.
// Do we want to allow for the concept of simultaneity, or use "realtime"
// for everything?
// Probably realtime.
// Here now we have to consider what we are trying to evaluate and represent.
// The idea

class Scene {
  constructor() {
    this.statesHistory = new StatesHistory();
    this.workingStates = {}; // model id -> model state
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
    let newState = model.operate(name, state, args);
    this.setCurrentState(model, newState);
  }
}

// functions / fuctional? operators? framework?

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

  let finalState = scene.getCurrentState(actor1);
  console.log(finalState);

})();

