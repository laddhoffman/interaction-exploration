'use strict';

const debug = require('debug')('int-exp:property');
const {fmtJson} = require('./util');

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
  clone() {
    let res = new Properties()
    res.properties = Object.create(this.properties);
    return res;
  }
  set(name, value) {
    this.properties[name] = value;
  }
  get(name) {
    return this.properties[name];
  }
  getNames() {
    return Object.keys(this.properties);
  }
  getList() {
    return this.getNames().map(name => {
      return {
        name,
        value: this.get(name),
      };
    });
  }
  getObj() {
    let obj = {};
    this.getNames().map(name => {
      obj[name] = this.get(name);
    });
    return obj;
  }
}

module.exports = {
  Property,
  Properties,
};
