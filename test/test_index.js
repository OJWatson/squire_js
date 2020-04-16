import {
  runModel,
  getPopulation,
  getMixingMatrix,
  getBeta
} from "../src/index.js"

import { flatten_array } from '../src/utils.js'

import pars from '../data/pars.json'
import { expect } from 'chai'
import sinon from 'sinon'

describe('runModel', function() {
  it('processes basic parameters correctly', function() {
    const expected = pars;

    const constructor = sinon.spy();

    class model {
      constructor() {
        constructor.apply(null, arguments);
      }
      run() {}
    }

    global.odin = [ model ];

    const mm = getMixingMatrix('Nigeria');
    const beta = getBeta('Nigeria');
    runModel(
      getPopulation('Nigeria'),
      [0, 50, 100],
      [mm, mm, mm],
      [0, 50, 200],
      [beta, beta/2, beta],
      10000000000,
      10000000000,
      0,
      250
    );

    const actual = constructor.getCall(0).args[0];
    Object.keys(expected).forEach(key => {
      expect(actual).to.have.property(key);
      const value = actual[key];
      if (Array.isArray(value)) {
        const e_flat = flatten_array(expected[key]);
        flatten_array(value).forEach((v, i) => {
          expect(v).to.be.closeTo(e_flat[i], 1e-6);
        })
      }
    })
  });
});
