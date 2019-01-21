'use strict';

const {Model} = require('./model');

// consider what kind of senarios we want to model
// and how we might do so.
// we want to support branching for different conditions

// How can we model conditions/constraints?
// We can construct expressions to represent them
// including logical expressions for composing them
// What should their inputs be?
// What information is or should be available when evaluating these?
// A model could express conditions on its own properties
// A model could express conditions on operations
// We also haven't yet really done anything with messaging
// in this particular framework.
// So far we've only give actors the ability to modify their own state
// when operations are called by the Scene.
// We might want to also give actors the ability to send Messages
// to other actors;
// and/or you might say, we can have actors implement operations that handle
// incoming messages.

// Should we also make provision for the notion of storing data, i.e. expose
// primitives for data storage and retrieval, separately from allowing models
// to modify their own state?
// We either need to implement this at a framework level, or else
// provide a generic mechanism for messaging among actors such that it can be
// implemented in that way by particular algorithms. I guess the question is,
// does it add value to be able to model it in such a detailed way? Does it more
// faithfully / usefully represent real systems, or is it adequate to provide a
// straightforward data storage/retrieval interface.
// I lean toward the latter, but I think the data storage/retrieval interface
// should have some specialized features:
// It should be able to model different kinds of storage engines, which have
// different properties / provide different guarantees / have different
// strengths and weaknesses; and correspondingly, we should then be able to
// model different possible behaviors of the storage.
// So we need to think about how the interface should be defined, by which a
// model can interface with data storage/retrieval.

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

// Let's see how far we can get by specifying that a Condition is to take
// a Properties object as its input. To support flexibility we may also specify
// that it takes at least one additional input which can be a custom args object
class Condition {
  constructor(properties) {
    this.properties = properties;
  }
  define(func) {
    this.func = func;
  }
  evaluate(args) {
    return this.func(this.properties, this.args);
  }
}

class Constraint {
  constructor() {
  }
}

class Expression {
  constructor() {
  }
}

class Logic {
  constructor() {
  }
}

class DataStorage {
  constructor() {
  }
  store() {
  }
  retrieve() {
  }
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

module.exports = {
  Actor,
  Condition,
};
