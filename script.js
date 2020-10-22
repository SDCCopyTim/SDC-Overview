import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

let errorRate = new Counter('errors');

export let options = {
  stages: [
    { duration: '1m10s', target: 100},
    { duration: '1m10s', target: 200},
    { duration: '1m10s', target: 300},
    { duration: '1m10s', target: 400},
    { duration: '1m10s', target: 500},
    { duration: '1m10s', target: 600},
    { duration: '1m10s', target: 700},
    { duration: '1m10s', target: 800},
    { duration: '1m10s', target: 900},
    { duration: '1m10s', target: 1000},
    { duration: '2m10s', target: 0}
  ],
  thresholds: {
    'errorRate': [
      // more than 1% of errors will abort the test
      { threshold: 'rate < 0.01', abortOnFail: true, delayAbortEval: '1m' }
    ]
  }
};

const randomNumber = () => Math.floor(Math.random() * 10000000) + 1;

export default function () {
  let res = http.get(`http://localhost:3003/api/sites/${randomNumber()}`);
  check(res, { 'status was 200': (r) => r.status === 200 }) || errorRate.add(1);
  sleep(1);
}


// stages: [
//   { duration: '6s', target: 100, rps: 100},
//   { duration: '6s', target: 200, rps: 200},
//   { duration: '6s', target: 300, rps: 300},
//   { duration: '6s', target: 400, rps: 400},
//   { duration: '6s', target: 500, rps: 500},
//   { duration: '6s', target: 600, rps: 600},
//   { duration: '6s', target: 700, rps: 700},
//   { duration: '6s', target: 800, rps: 800},
//   { duration: '6s', target: 900, rps: 900},
//   { duration: '6s', target: 1000, rps: 1000},
// ],