import http from 'k6/http';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 100,
      maxVUs: 10000,
    }
  }
};
export default function () {
  http.get('http://localhost:4001/api/hotel/hotel10000000');
}
