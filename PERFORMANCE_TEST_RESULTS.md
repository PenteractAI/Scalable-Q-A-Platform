# Answers
## Create new answers
scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
* default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..............: 4.1 MB  407 kB/s
     data_sent..................: 4.4 MB  444 kB/s
     http_req_blocked...........: med=0s     p(99)=0s
     http_req_connecting........: med=0s     p(99)=0s
     http_req_duration..........: med=4.49ms p(99)=9.02ms
     http_req_failed............: 100.00% ✓ 20360       ✗ 0
     http_req_receiving.........: med=0s     p(99)=508.49µs
     http_req_sending...........: med=0s     p(99)=505.29µs
     http_req_tls_handshaking...: med=0s     p(99)=0s
     http_req_waiting...........: med=4.49ms p(99)=9ms
     http_reqs..................: 20360   2034.927939/s
     iteration_duration.........: med=4.5ms  p(99)=9.5ms
     iterations.................: 20360   2034.927939/s
     vus........................: 10      min=10        max=10
     vus_max....................: 10      min=10        max=10


running (10.0s), 00/10 VUs, 20360 complete and 0 interrupted iterations

## Retrieve answers
scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
* default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 90 MB  9.0 MB/s
     data_sent......................: 1.0 MB 105 kB/s
     http_req_blocked...............: med=0s     p(99)=0s
     http_req_connecting............: med=0s     p(99)=0s
     http_req_duration..............: med=8ms    p(99)=16ms
       { expected_response:true }...: med=8ms    p(99)=16ms
     http_req_failed................: 0.00%  ✓ 0          ✗ 10154
     http_req_receiving.............: med=0s     p(99)=509.44µs
     http_req_sending...............: med=0s     p(99)=502.24µs
     http_req_tls_handshaking.......: med=0s     p(99)=0s
     http_req_waiting...............: med=8ms    p(99)=15.99ms
     http_reqs......................: 10154  1014.59795/s
     iteration_duration.............: med=8.49ms p(99)=16ms
     iterations.....................: 10154  1014.59795/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10


running (10.0s), 00/10 VUs, 10154 complete and 0 interrupted iterations

# Course
## Retrieve courses
scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
* default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 483 MB 48 MB/s
     data_sent......................: 1.2 MB 121 kB/s
     http_req_blocked...............: med=0s     p(99)=489.7µs
     http_req_connecting............: med=0s     p(99)=0s
     http_req_duration..............: med=4.48ms p(99)=10.5ms
       { expected_response:true }...: med=4.48ms p(99)=10.5ms
     http_req_failed................: 0.00%  ✓ 0           ✗ 15117
     http_req_receiving.............: med=0s     p(99)=992.7µs
     http_req_sending...............: med=0s     p(99)=503.28µs
     http_req_tls_handshaking.......: med=0s     p(99)=0s
     http_req_waiting...............: med=4ms    p(99)=10.03ms
     http_reqs......................: 15117  1511.361772/s
     iteration_duration.............: med=4.49ms p(99)=10.53ms
     iterations.....................: 15117  1511.361772/s
     vus............................: 10     min=10        max=10
     vus_max........................: 10     min=10        max=10


running (10.0s), 00/10 VUs, 15117 complete and 0 interrupted iterations

# Questions
## Create new questions
scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
* default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..............: 4.3 MB  430 kB/s
     data_sent..................: 5.5 MB  552 kB/s
     http_req_blocked...........: med=0s     p(99)=0s
     http_req_connecting........: med=0s     p(99)=0s
     http_req_duration..........: med=4.04ms p(99)=9.49ms
     http_req_failed............: 100.00% ✓ 21494       ✗ 0
     http_req_receiving.........: med=0s     p(99)=508.2µs
     http_req_sending...........: med=0s     p(99)=503.9µs
     http_req_tls_handshaking...: med=0s     p(99)=0s
     http_req_waiting...........: med=4ms    p(99)=9.39ms
     http_reqs..................: 21494   2148.600355/s
     iteration_duration.........: med=4.49ms p(99)=9.5ms
     iterations.................: 21494   2148.600355/s
     vus........................: 10      min=10        max=10
     vus_max....................: 10      min=10        max=10


running (10.0s), 00/10 VUs, 21494 complete and 0 interrupted iterations

## Retrieve information about a question
scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
* default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..............: 4.4 MB  438 kB/s
     data_sent..................: 2.1 MB  212 kB/s
     http_req_blocked...........: med=0s     p(99)=0s
     http_req_connecting........: med=0s     p(99)=0s
     http_req_duration..........: med=4.49ms p(99)=8.04ms
     http_req_failed............: 100.00% ✓ 21890       ✗ 0
     http_req_receiving.........: med=0s     p(99)=507.2µs
     http_req_sending...........: med=0s     p(99)=502.1µs
     http_req_tls_handshaking...: med=0s     p(99)=0s
     http_req_waiting...........: med=4ms    p(99)=8ms
     http_reqs..................: 21890   2188.316479/s
     iteration_duration.........: med=4.49ms p(99)=8.49ms
     iterations.................: 21890   2188.316479/s
     vus........................: 10      min=10        max=10
     vus_max....................: 10      min=10        max=10


running (10.0s), 00/10 VUs, 21890 complete and 0 interrupted iterations

## Retrieve questions
scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
* default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..............: 4.2 MB  423 kB/s
     data_sent..................: 2.0 MB  201 kB/s
     http_req_blocked...........: med=0s     p(99)=0s
     http_req_connecting........: med=0s     p(99)=0s
     http_req_duration..........: med=4.49ms p(99)=9ms
     http_req_failed............: 100.00% ✓ 21154       ✗ 0
     http_req_receiving.........: med=0s     p(99)=507.9µs
     http_req_sending...........: med=0s     p(99)=502.6µs
     http_req_tls_handshaking...: med=0s     p(99)=0s
     http_req_waiting...........: med=4.49ms p(99)=8.6ms
     http_reqs..................: 21154   2114.558998/s
     iteration_duration.........: med=4.5ms  p(99)=9.01ms
     iterations.................: 21154   2114.558998/s
     vus........................: 10      min=10        max=10
     vus_max....................: 10      min=10        max=10


running (10.0s), 00/10 VUs, 21154 complete and 0 interrupted iterations