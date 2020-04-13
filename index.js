export const runModel = function(
  mixingMatrix,
  intStartTs,
  intEndTs,
  intEff,
  nBeds,
  nICUBeds,
  timeStart = 1,
  timeEnd = 200
  ) {

  const model = Object.values(odin)[0];
  const user = {
    S0: { data: [ 100000, 1000000 ], dim: [2] },
    E0: { data: [ 0, 0 ], dim: [2] },
    I_mild0: { data: [ 100, 100 ], dim: [2] },
    I_hosp0: { data: [ 100, 100 ], dim: [2] },
    I_ICU0: { data: [ 100, 100 ], dim: [2] },
    R0: { data: [0, 0], dim: [2] },
    D0: { data: [0, 0], dim: [2] },
    gamma: 0.3,
    sigma: 0.3,
    mu: 0.01,
    p_mild: { data: [0.33, 0.33], dim: [2] },
    p_hosp: { data: [0.33, 0.33], dim: [2] },
    p_ICU: { data: [0.34, 0.34], dim: [2] },
    beta_1: 0.1,
    beta_2: 0.1,
    m: { data: [ 5/100000, 2/100000, 2/100000, 5/100000 ], dim: [2, 2] }
  }

  const mod = new model(user);
  const dt = .1;
  let t = [];
  for (let i = 0; i < (timeEnd - timeStart) / dt; ++i) {
    t.push(timeStart + i * dt);
  }

  return mod.run(t);
}
