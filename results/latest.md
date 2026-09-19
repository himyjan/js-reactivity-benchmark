# Benchmark snapshot

2026-09-19T09:24:42.628Z → 2026-09-19T09:30:06.265Z

**passed** · full · observed graphs · CellX standard

v26.7.0 · Apple M3 Pro · darwin arm64

476 measurements; 0 failed suites. Times are milliseconds. Each framework/suite runs in a fresh process; values are the minimum of 3 samples. Explicit GC is outside timing. Raw samples are in the adjacent JSON file. See the repository README for workload definitions and limitations.

## Comparison by workload family

Geometric mean of each case's time divided by the fastest engine on that case. Lower is better; 1× means fastest on every case in that family. Cases have equal weight within a family. There is no overall score. Small CellX timings are particularly sensitive to noise.

| Engine | kairo | mol | s | dynamic | cellx |
| --- | ---: | ---: | ---: | ---: | ---: |
| alien-signals | 1.02× | 1.29× | 1.01× | 1.00× | 1.02× |
| @angular/signals | 2.95× | 1.34× | 2.72× | 2.74× | 2.30× |
| MobX | 4.15× | 1.43× | 4.37× | 2.74× | 4.20× |
| $mol_wire | 4.33× | 1.00× | 4.80× | 2.21× | 2.39× |
| Oby | 2.24× | 1.56× | 3.55× | 1.87× | 2.50× |
| Pota | 3.04× | 1.57× | 3.31× | 2.05× | 1.32× |
| Preact Signals | 1.23× | 1.28× | 1.32× | 1.36× | 1.30× |
| TC39 Signals Polyfill | 6.40× | 1.46× | 3.71× | 10.35× | 3.07× |
| SolidJS | 4.33× | 1.59× | 3.70× | 3.66× | 1.78× |
| Svelte v5 | 4.31× | 1.36× | 2.76× | 2.26× | 148.89× |
| @amadeus-it-group/tansu | 2.95× | 1.32× | 2.99× | 1.96× | 2.53× |
| @tldraw/state | 4.03× | 1.37× | 2.67× | 5.29× | 2.96× |
| uSignal | 3.28× | 1.84× | 2.68× | 2.35× | 1.72× |
| @vue/reactivity | 2.10× | 1.30× | 1.39× | 1.78× | 2.51× |

## Packages

| Package | Version |
| --- | --- |
| alien-signals | 3.2.1 |
| @angular/core | 22.1.7 |
| mobx | 7.0.3 |
| mol_wire_lib | 1.0.1781 |
| oby | 15.1.2 |
| pota | 0.22.235 |
| @preact/signals-core | 1.14.4 |
| signal-polyfill | 0.2.2 |
| solid-js | 1.9.15 |
| svelte | 5.57.0 |
| @amadeus-it-group/tansu | 2.0.0 |
| @tldraw/state | 5.4.2 |
| usignal | 0.10.0 |
| @vue/reactivity | 3.5.43 |

## Measurements

| Framework | Suite | Test | ms |
| --- | --- | --- | ---: |
| alien-signals | kairo | avoidablePropagation | 68.4320 |
| alien-signals | kairo | broadPropagation | 139.0076 |
| alien-signals | kairo | deepPropagation | 49.8107 |
| alien-signals | kairo | diamond | 85.7765 |
| alien-signals | kairo | mux | 157.5352 |
| alien-signals | kairo | repeatedObservers | 10.4938 |
| alien-signals | kairo | triangle | 33.4090 |
| alien-signals | kairo | unstable | 30.3818 |
| alien-signals | mol | molBench | 299.6838 |
| alien-signals | s | createDataSignals | 4.1972 |
| alien-signals | s | createComputations0to1 | 2.6374 |
| alien-signals | s | createComputations1to1 | 7.3565 |
| alien-signals | s | createComputations2to1 | 6.3471 |
| alien-signals | s | createComputations4to1 | 5.7405 |
| alien-signals | s | createComputations1000to1 | 4.9359 |
| alien-signals | s | createComputations1to2 | 5.8108 |
| alien-signals | s | createComputations1to4 | 5.1823 |
| alien-signals | s | createComputations1to8 | 4.5996 |
| alien-signals | s | createComputations1to1000 | 3.9190 |
| alien-signals | s | updateComputations1to1 | 15.6276 |
| alien-signals | s | updateComputations2to1 | 8.9304 |
| alien-signals | s | updateComputations4to1 | 5.7186 |
| alien-signals | s | updateComputations1000to1 | 3.3310 |
| alien-signals | s | updateComputations1to2 | 11.5078 |
| alien-signals | s | updateComputations1to4 | 10.1318 |
| alien-signals | s | updateComputations1to1000 | 10.0298 |
| alien-signals | dynamic | 10x5 - 2 sources - read 20% (simple component) | 133.9061 |
| alien-signals | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 112.7862 |
| alien-signals | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 203.7861 |
| alien-signals | dynamic | 1000x5 - 25 sources (wide dense) | 381.1835 |
| alien-signals | dynamic | 5x500 - 3 sources (deep) | 88.3366 |
| alien-signals | cellx | cellx10 | 0.0260 |
| alien-signals | cellx | cellx20 | 0.0273 |
| alien-signals | cellx | cellx30 | 0.0222 |
| @angular/signals | kairo | avoidablePropagation | 164.4086 |
| @angular/signals | kairo | broadPropagation | 471.5659 |
| @angular/signals | kairo | deepPropagation | 141.7568 |
| @angular/signals | kairo | diamond | 248.5719 |
| @angular/signals | kairo | mux | 419.1467 |
| @angular/signals | kairo | repeatedObservers | 34.9828 |
| @angular/signals | kairo | triangle | 101.9669 |
| @angular/signals | kairo | unstable | 79.4085 |
| @angular/signals | mol | molBench | 309.8076 |
| @angular/signals | s | createDataSignals | 19.4994 |
| @angular/signals | s | createComputations0to1 | 6.1564 |
| @angular/signals | s | createComputations1to1 | 47.1953 |
| @angular/signals | s | createComputations2to1 | 41.9144 |
| @angular/signals | s | createComputations4to1 | 32.7894 |
| @angular/signals | s | createComputations1000to1 | 22.6073 |
| @angular/signals | s | createComputations1to2 | 28.8778 |
| @angular/signals | s | createComputations1to4 | 14.8515 |
| @angular/signals | s | createComputations1to8 | 10.0804 |
| @angular/signals | s | createComputations1to1000 | 6.0425 |
| @angular/signals | s | updateComputations1to1 | 20.5142 |
| @angular/signals | s | updateComputations2to1 | 11.7206 |
| @angular/signals | s | updateComputations4to1 | 8.8550 |
| @angular/signals | s | updateComputations1000to1 | 7.2721 |
| @angular/signals | s | updateComputations1to2 | 18.3829 |
| @angular/signals | s | updateComputations1to4 | 21.6740 |
| @angular/signals | s | updateComputations1to1000 | 18.2483 |
| @angular/signals | dynamic | 10x5 - 2 sources - read 20% (simple component) | 427.2522 |
| @angular/signals | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 323.7407 |
| @angular/signals | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 551.3990 |
| @angular/signals | dynamic | 1000x5 - 25 sources (wide dense) | 894.6165 |
| @angular/signals | dynamic | 5x500 - 3 sources (deep) | 233.3870 |
| @angular/signals | cellx | cellx10 | 0.0535 |
| @angular/signals | cellx | cellx20 | 0.0596 |
| @angular/signals | cellx | cellx30 | 0.0558 |
| MobX | kairo | avoidablePropagation | 301.4318 |
| MobX | kairo | broadPropagation | 762.0882 |
| MobX | kairo | deepPropagation | 295.2644 |
| MobX | kairo | diamond | 391.2399 |
| MobX | kairo | mux | 439.8625 |
| MobX | kairo | repeatedObservers | 31.7852 |
| MobX | kairo | triangle | 143.8796 |
| MobX | kairo | unstable | 92.8027 |
| MobX | mol | molBench | 331.9000 |
| MobX | s | createDataSignals | 8.0105 |
| MobX | s | createComputations0to1 | 26.8728 |
| MobX | s | createComputations1to1 | 78.6947 |
| MobX | s | createComputations2to1 | 29.2283 |
| MobX | s | createComputations4to1 | 22.0730 |
| MobX | s | createComputations1000to1 | 11.8740 |
| MobX | s | createComputations1to2 | 49.8878 |
| MobX | s | createComputations1to4 | 47.5405 |
| MobX | s | createComputations1to8 | 54.9960 |
| MobX | s | createComputations1to1000 | 39.5756 |
| MobX | s | updateComputations1to1 | 38.7571 |
| MobX | s | updateComputations2to1 | 22.4952 |
| MobX | s | updateComputations4to1 | 13.1079 |
| MobX | s | updateComputations1000to1 | 5.7348 |
| MobX | s | updateComputations1to2 | 37.0010 |
| MobX | s | updateComputations1to4 | 33.5179 |
| MobX | s | updateComputations1to1000 | 30.7342 |
| MobX | dynamic | 10x5 - 2 sources - read 20% (simple component) | 517.6243 |
| MobX | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 357.9354 |
| MobX | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 560.7184 |
| MobX | dynamic | 1000x5 - 25 sources (wide dense) | 628.1980 |
| MobX | dynamic | 5x500 - 3 sources (deep) | 245.2056 |
| MobX | cellx | cellx10 | 0.0935 |
| MobX | cellx | cellx20 | 0.1284 |
| MobX | cellx | cellx30 | 0.0910 |
| $mol_wire | kairo | avoidablePropagation | 231.5349 |
| $mol_wire | kairo | broadPropagation | 710.6515 |
| $mol_wire | kairo | deepPropagation | 204.0975 |
| $mol_wire | kairo | diamond | 303.5410 |
| $mol_wire | kairo | mux | 497.2188 |
| $mol_wire | kairo | repeatedObservers | 69.7157 |
| $mol_wire | kairo | triangle | 108.1477 |
| $mol_wire | kairo | unstable | 183.2173 |
| $mol_wire | mol | molBench | 231.6797 |
| $mol_wire | s | createDataSignals | 15.3209 |
| $mol_wire | s | createComputations0to1 | 13.4819 |
| $mol_wire | s | createComputations1to1 | 61.3326 |
| $mol_wire | s | createComputations2to1 | 41.6611 |
| $mol_wire | s | createComputations4to1 | 33.5732 |
| $mol_wire | s | createComputations1000to1 | 27.5455 |
| $mol_wire | s | createComputations1to2 | 43.1402 |
| $mol_wire | s | createComputations1to4 | 33.8354 |
| $mol_wire | s | createComputations1to8 | 26.5721 |
| $mol_wire | s | createComputations1to1000 | 22.2142 |
| $mol_wire | s | updateComputations1to1 | 51.3705 |
| $mol_wire | s | updateComputations2to1 | 28.3177 |
| $mol_wire | s | updateComputations4to1 | 17.9079 |
| $mol_wire | s | updateComputations1000to1 | 8.2266 |
| $mol_wire | s | updateComputations1to2 | 44.3184 |
| $mol_wire | s | updateComputations1to4 | 43.2312 |
| $mol_wire | s | updateComputations1to1000 | 47.8356 |
| $mol_wire | dynamic | 10x5 - 2 sources - read 20% (simple component) | 430.1085 |
| $mol_wire | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 262.0285 |
| $mol_wire | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 417.6145 |
| $mol_wire | dynamic | 1000x5 - 25 sources (wide dense) | 572.3081 |
| $mol_wire | dynamic | 5x500 - 3 sources (deep) | 201.5696 |
| $mol_wire | cellx | cellx10 | 0.0551 |
| $mol_wire | cellx | cellx20 | 0.0522 |
| $mol_wire | cellx | cellx30 | 0.0697 |
| Oby | kairo | avoidablePropagation | 156.7360 |
| Oby | kairo | broadPropagation | 329.1073 |
| Oby | kairo | deepPropagation | 148.4118 |
| Oby | kairo | diamond | 179.5327 |
| Oby | kairo | mux | 284.4008 |
| Oby | kairo | repeatedObservers | 24.7286 |
| Oby | kairo | triangle | 84.8880 |
| Oby | kairo | unstable | 43.6719 |
| Oby | mol | molBench | 362.1275 |
| Oby | s | createDataSignals | 8.8168 |
| Oby | s | createComputations0to1 | 20.1059 |
| Oby | s | createComputations1to1 | 60.8942 |
| Oby | s | createComputations2to1 | 38.0984 |
| Oby | s | createComputations4to1 | 27.5843 |
| Oby | s | createComputations1000to1 | 10.6040 |
| Oby | s | createComputations1to2 | 40.7252 |
| Oby | s | createComputations1to4 | 32.6088 |
| Oby | s | createComputations1to8 | 28.0502 |
| Oby | s | createComputations1to1000 | 28.6636 |
| Oby | s | updateComputations1to1 | 23.4986 |
| Oby | s | updateComputations2to1 | 14.4030 |
| Oby | s | updateComputations4to1 | 8.9279 |
| Oby | s | updateComputations1000to1 | 8.1218 |
| Oby | s | updateComputations1to2 | 25.5988 |
| Oby | s | updateComputations1to4 | 24.6182 |
| Oby | s | updateComputations1to1000 | 24.0745 |
| Oby | dynamic | 10x5 - 2 sources - read 20% (simple component) | 319.0285 |
| Oby | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 222.2424 |
| Oby | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 397.3852 |
| Oby | dynamic | 1000x5 - 25 sources (wide dense) | 436.1434 |
| Oby | dynamic | 5x500 - 3 sources (deep) | 192.7332 |
| Oby | cellx | cellx10 | 0.0665 |
| Oby | cellx | cellx20 | 0.0470 |
| Oby | cellx | cellx30 | 0.0734 |
| Pota | kairo | avoidablePropagation | 266.0195 |
| Pota | kairo | broadPropagation | 402.7818 |
| Pota | kairo | deepPropagation | 163.6657 |
| Pota | kairo | diamond | 250.4357 |
| Pota | kairo | mux | 287.2117 |
| Pota | kairo | repeatedObservers | 53.7355 |
| Pota | kairo | triangle | 82.8487 |
| Pota | kairo | unstable | 74.3210 |
| Pota | mol | molBench | 364.6625 |
| Pota | s | createDataSignals | 7.8125 |
| Pota | s | createComputations0to1 | 11.1499 |
| Pota | s | createComputations1to1 | 45.4355 |
| Pota | s | createComputations2to1 | 25.1400 |
| Pota | s | createComputations4to1 | 26.8542 |
| Pota | s | createComputations1000to1 | 9.0115 |
| Pota | s | createComputations1to2 | 32.5067 |
| Pota | s | createComputations1to4 | 19.7841 |
| Pota | s | createComputations1to8 | 18.7141 |
| Pota | s | createComputations1to1000 | 12.1170 |
| Pota | s | updateComputations1to1 | 49.0315 |
| Pota | s | updateComputations2to1 | 27.6213 |
| Pota | s | updateComputations4to1 | 16.7555 |
| Pota | s | updateComputations1000to1 | 7.2138 |
| Pota | s | updateComputations1to2 | 36.0518 |
| Pota | s | updateComputations1to4 | 30.0268 |
| Pota | s | updateComputations1to1000 | 24.0587 |
| Pota | dynamic | 10x5 - 2 sources - read 20% (simple component) | 442.3383 |
| Pota | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 247.3599 |
| Pota | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 332.3470 |
| Pota | dynamic | 1000x5 - 25 sources (wide dense) | 517.3195 |
| Pota | dynamic | 5x500 - 3 sources (deep) | 200.5455 |
| Pota | cellx | cellx10 | 0.0370 |
| Pota | cellx | cellx20 | 0.0382 |
| Pota | cellx | cellx30 | 0.0239 |
| Preact Signals | kairo | avoidablePropagation | 87.9723 |
| Preact Signals | kairo | broadPropagation | 161.9487 |
| Preact Signals | kairo | deepPropagation | 69.6497 |
| Preact Signals | kairo | diamond | 114.7751 |
| Preact Signals | kairo | mux | 174.4663 |
| Preact Signals | kairo | repeatedObservers | 12.1314 |
| Preact Signals | kairo | triangle | 48.0741 |
| Preact Signals | kairo | unstable | 25.1914 |
| Preact Signals | mol | molBench | 297.4961 |
| Preact Signals | s | createDataSignals | 5.4256 |
| Preact Signals | s | createComputations0to1 | 4.4842 |
| Preact Signals | s | createComputations1to1 | 13.7535 |
| Preact Signals | s | createComputations2to1 | 8.5693 |
| Preact Signals | s | createComputations4to1 | 6.1855 |
| Preact Signals | s | createComputations1000to1 | 6.7287 |
| Preact Signals | s | createComputations1to2 | 11.5788 |
| Preact Signals | s | createComputations1to4 | 10.4069 |
| Preact Signals | s | createComputations1to8 | 8.7778 |
| Preact Signals | s | createComputations1to1000 | 4.4533 |
| Preact Signals | s | updateComputations1to1 | 16.4006 |
| Preact Signals | s | updateComputations2to1 | 9.3969 |
| Preact Signals | s | updateComputations4to1 | 6.0323 |
| Preact Signals | s | updateComputations1000to1 | 4.2883 |
| Preact Signals | s | updateComputations1to2 | 11.4832 |
| Preact Signals | s | updateComputations1to4 | 10.4191 |
| Preact Signals | s | updateComputations1to1000 | 8.6698 |
| Preact Signals | dynamic | 10x5 - 2 sources - read 20% (simple component) | 189.4463 |
| Preact Signals | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 169.0138 |
| Preact Signals | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 273.5302 |
| Preact Signals | dynamic | 1000x5 - 25 sources (wide dense) | 421.9842 |
| Preact Signals | dynamic | 5x500 - 3 sources (deep) | 129.7125 |
| Preact Signals | cellx | cellx10 | 0.0478 |
| Preact Signals | cellx | cellx20 | 0.0255 |
| Preact Signals | cellx | cellx30 | 0.0265 |
| TC39 Signals Polyfill | kairo | avoidablePropagation | 252.6928 |
| TC39 Signals Polyfill | kairo | broadPropagation | 879.7667 |
| TC39 Signals Polyfill | kairo | deepPropagation | 238.6133 |
| TC39 Signals Polyfill | kairo | diamond | 414.3286 |
| TC39 Signals Polyfill | kairo | mux | 660.8802 |
| TC39 Signals Polyfill | kairo | repeatedObservers | 133.8506 |
| TC39 Signals Polyfill | kairo | triangle | 174.4359 |
| TC39 Signals Polyfill | kairo | unstable | 467.0572 |
| TC39 Signals Polyfill | mol | molBench | 338.8466 |
| TC39 Signals Polyfill | s | createDataSignals | 12.6232 |
| TC39 Signals Polyfill | s | createComputations0to1 | 14.8482 |
| TC39 Signals Polyfill | s | createComputations1to1 | 38.8335 |
| TC39 Signals Polyfill | s | createComputations2to1 | 28.1910 |
| TC39 Signals Polyfill | s | createComputations4to1 | 21.4410 |
| TC39 Signals Polyfill | s | createComputations1000to1 | 13.2184 |
| TC39 Signals Polyfill | s | createComputations1to2 | 31.6625 |
| TC39 Signals Polyfill | s | createComputations1to4 | 28.1160 |
| TC39 Signals Polyfill | s | createComputations1to8 | 23.5978 |
| TC39 Signals Polyfill | s | createComputations1to1000 | 21.5317 |
| TC39 Signals Polyfill | s | updateComputations1to1 | 40.2070 |
| TC39 Signals Polyfill | s | updateComputations2to1 | 23.9387 |
| TC39 Signals Polyfill | s | updateComputations4to1 | 17.2847 |
| TC39 Signals Polyfill | s | updateComputations1000to1 | 8.0875 |
| TC39 Signals Polyfill | s | updateComputations1to2 | 33.8053 |
| TC39 Signals Polyfill | s | updateComputations1to4 | 32.7898 |
| TC39 Signals Polyfill | s | updateComputations1to1000 | 25.8176 |
| TC39 Signals Polyfill | dynamic | 10x5 - 2 sources - read 20% (simple component) | 1255.6814 |
| TC39 Signals Polyfill | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 494.5552 |
| TC39 Signals Polyfill | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 9096.3068 |
| TC39 Signals Polyfill | dynamic | 1000x5 - 25 sources (wide dense) | 6643.1631 |
| TC39 Signals Polyfill | dynamic | 5x500 - 3 sources (deep) | 327.9877 |
| TC39 Signals Polyfill | cellx | cellx10 | 0.0779 |
| TC39 Signals Polyfill | cellx | cellx20 | 0.0822 |
| TC39 Signals Polyfill | cellx | cellx30 | 0.0667 |
| SolidJS | kairo | avoidablePropagation | 319.9390 |
| SolidJS | kairo | broadPropagation | 751.1590 |
| SolidJS | kairo | deepPropagation | 285.5593 |
| SolidJS | kairo | diamond | 407.1817 |
| SolidJS | kairo | mux | 409.9090 |
| SolidJS | kairo | repeatedObservers | 53.0675 |
| SolidJS | kairo | triangle | 140.6290 |
| SolidJS | kairo | unstable | 81.9398 |
| SolidJS | mol | molBench | 367.2637 |
| SolidJS | s | createDataSignals | 6.9174 |
| SolidJS | s | createComputations0to1 | 6.8878 |
| SolidJS | s | createComputations1to1 | 41.4218 |
| SolidJS | s | createComputations2to1 | 36.5390 |
| SolidJS | s | createComputations4to1 | 27.7784 |
| SolidJS | s | createComputations1000to1 | 8.8007 |
| SolidJS | s | createComputations1to2 | 29.4419 |
| SolidJS | s | createComputations1to4 | 18.3372 |
| SolidJS | s | createComputations1to8 | 14.0476 |
| SolidJS | s | createComputations1to1000 | 12.8743 |
| SolidJS | s | updateComputations1to1 | 57.0220 |
| SolidJS | s | updateComputations2to1 | 36.6820 |
| SolidJS | s | updateComputations4to1 | 28.4845 |
| SolidJS | s | updateComputations1000to1 | 20.3534 |
| SolidJS | s | updateComputations1to2 | 38.7051 |
| SolidJS | s | updateComputations1to4 | 35.5018 |
| SolidJS | s | updateComputations1to1000 | 33.1889 |
| SolidJS | dynamic | 10x5 - 2 sources - read 20% (simple component) | 1201.0479 |
| SolidJS | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 439.4589 |
| SolidJS | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 531.9635 |
| SolidJS | dynamic | 1000x5 - 25 sources (wide dense) | 875.3602 |
| SolidJS | dynamic | 5x500 - 3 sources (deep) | 276.7272 |
| SolidJS | cellx | cellx10 | 0.0447 |
| SolidJS | cellx | cellx20 | 0.0595 |
| SolidJS | cellx | cellx30 | 0.0312 |
| Svelte v5 | kairo | avoidablePropagation | 421.6328 |
| Svelte v5 | kairo | broadPropagation | 660.0530 |
| Svelte v5 | kairo | deepPropagation | 286.4688 |
| Svelte v5 | kairo | diamond | 435.1763 |
| Svelte v5 | kairo | mux | 271.7036 |
| Svelte v5 | kairo | repeatedObservers | 55.1992 |
| Svelte v5 | kairo | triangle | 147.6672 |
| Svelte v5 | kairo | unstable | 87.6404 |
| Svelte v5 | mol | molBench | 314.0056 |
| Svelte v5 | s | createDataSignals | 5.3464 |
| Svelte v5 | s | createComputations0to1 | 13.0087 |
| Svelte v5 | s | createComputations1to1 | 17.2285 |
| Svelte v5 | s | createComputations2to1 | 11.2586 |
| Svelte v5 | s | createComputations4to1 | 8.1720 |
| Svelte v5 | s | createComputations1000to1 | 5.2162 |
| Svelte v5 | s | createComputations1to2 | 15.0693 |
| Svelte v5 | s | createComputations1to4 | 13.5045 |
| Svelte v5 | s | createComputations1to8 | 12.6605 |
| Svelte v5 | s | createComputations1to1000 | 11.3055 |
| Svelte v5 | s | updateComputations1to1 | 113.2088 |
| Svelte v5 | s | updateComputations2to1 | 57.6791 |
| Svelte v5 | s | updateComputations4to1 | 30.3510 |
| Svelte v5 | s | updateComputations1000to1 | 3.6686 |
| Svelte v5 | s | updateComputations1to2 | 66.1330 |
| Svelte v5 | s | updateComputations1to4 | 42.8528 |
| Svelte v5 | s | updateComputations1to1000 | 19.1216 |
| Svelte v5 | dynamic | 10x5 - 2 sources - read 20% (simple component) | 572.0454 |
| Svelte v5 | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 249.1899 |
| Svelte v5 | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 441.6653 |
| Svelte v5 | dynamic | 1000x5 - 25 sources (wide dense) | 435.9628 |
| Svelte v5 | dynamic | 5x500 - 3 sources (deep) | 220.2673 |
| Svelte v5 | cellx | cellx10 | 0.1015 |
| Svelte v5 | cellx | cellx20 | 2.0144 |
| Svelte v5 | cellx | cellx30 | 237.5924 |
| @amadeus-it-group/tansu | kairo | avoidablePropagation | 192.3268 |
| @amadeus-it-group/tansu | kairo | broadPropagation | 501.5187 |
| @amadeus-it-group/tansu | kairo | deepPropagation | 146.4695 |
| @amadeus-it-group/tansu | kairo | diamond | 194.3777 |
| @amadeus-it-group/tansu | kairo | mux | 451.1980 |
| @amadeus-it-group/tansu | kairo | repeatedObservers | 39.4171 |
| @amadeus-it-group/tansu | kairo | triangle | 68.2924 |
| @amadeus-it-group/tansu | kairo | unstable | 96.5527 |
| @amadeus-it-group/tansu | mol | molBench | 306.8998 |
| @amadeus-it-group/tansu | s | createDataSignals | 8.9526 |
| @amadeus-it-group/tansu | s | createComputations0to1 | 16.0203 |
| @amadeus-it-group/tansu | s | createComputations1to1 | 39.3777 |
| @amadeus-it-group/tansu | s | createComputations2to1 | 24.8208 |
| @amadeus-it-group/tansu | s | createComputations4to1 | 21.7975 |
| @amadeus-it-group/tansu | s | createComputations1000to1 | 11.9660 |
| @amadeus-it-group/tansu | s | createComputations1to2 | 27.5123 |
| @amadeus-it-group/tansu | s | createComputations1to4 | 22.9948 |
| @amadeus-it-group/tansu | s | createComputations1to8 | 18.3886 |
| @amadeus-it-group/tansu | s | createComputations1to1000 | 16.4998 |
| @amadeus-it-group/tansu | s | updateComputations1to1 | 27.3848 |
| @amadeus-it-group/tansu | s | updateComputations2to1 | 16.7454 |
| @amadeus-it-group/tansu | s | updateComputations4to1 | 10.3574 |
| @amadeus-it-group/tansu | s | updateComputations1000to1 | 6.3677 |
| @amadeus-it-group/tansu | s | updateComputations1to2 | 23.8495 |
| @amadeus-it-group/tansu | s | updateComputations1to4 | 22.8652 |
| @amadeus-it-group/tansu | s | updateComputations1to1000 | 22.4947 |
| @amadeus-it-group/tansu | dynamic | 10x5 - 2 sources - read 20% (simple component) | 323.9916 |
| @amadeus-it-group/tansu | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 221.7778 |
| @amadeus-it-group/tansu | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 431.3600 |
| @amadeus-it-group/tansu | dynamic | 1000x5 - 25 sources (wide dense) | 512.7664 |
| @amadeus-it-group/tansu | dynamic | 5x500 - 3 sources (deep) | 189.2067 |
| @amadeus-it-group/tansu | cellx | cellx10 | 0.0629 |
| @amadeus-it-group/tansu | cellx | cellx20 | 0.0619 |
| @amadeus-it-group/tansu | cellx | cellx30 | 0.0612 |
| @tldraw/state | kairo | avoidablePropagation | 268.5803 |
| @tldraw/state | kairo | broadPropagation | 740.1566 |
| @tldraw/state | kairo | deepPropagation | 224.7825 |
| @tldraw/state | kairo | diamond | 351.7267 |
| @tldraw/state | kairo | mux | 497.2632 |
| @tldraw/state | kairo | repeatedObservers | 45.2075 |
| @tldraw/state | kairo | triangle | 151.9503 |
| @tldraw/state | kairo | unstable | 72.7243 |
| @tldraw/state | mol | molBench | 317.7332 |
| @tldraw/state | s | createDataSignals | 6.1282 |
| @tldraw/state | s | createComputations0to1 | 5.9834 |
| @tldraw/state | s | createComputations1to1 | 15.5175 |
| @tldraw/state | s | createComputations2to1 | 9.7202 |
| @tldraw/state | s | createComputations4to1 | 8.2077 |
| @tldraw/state | s | createComputations1000to1 | 10.4156 |
| @tldraw/state | s | createComputations1to2 | 14.1430 |
| @tldraw/state | s | createComputations1to4 | 13.2525 |
| @tldraw/state | s | createComputations1to8 | 12.5736 |
| @tldraw/state | s | createComputations1to1000 | 10.6744 |
| @tldraw/state | s | updateComputations1to1 | 50.2142 |
| @tldraw/state | s | updateComputations2to1 | 31.7151 |
| @tldraw/state | s | updateComputations4to1 | 22.7433 |
| @tldraw/state | s | updateComputations1000to1 | 18.5997 |
| @tldraw/state | s | updateComputations1to2 | 42.2417 |
| @tldraw/state | s | updateComputations1to4 | 35.5945 |
| @tldraw/state | s | updateComputations1to1000 | 31.4370 |
| @tldraw/state | dynamic | 10x5 - 2 sources - read 20% (simple component) | 560.9970 |
| @tldraw/state | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 359.4713 |
| @tldraw/state | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 3049.6612 |
| @tldraw/state | dynamic | 1000x5 - 25 sources (wide dense) | 2814.8811 |
| @tldraw/state | dynamic | 5x500 - 3 sources (deep) | 247.0988 |
| @tldraw/state | cellx | cellx10 | 0.0822 |
| @tldraw/state | cellx | cellx20 | 0.0707 |
| @tldraw/state | cellx | cellx30 | 0.0660 |
| uSignal | kairo | avoidablePropagation | 361.0186 |
| uSignal | kairo | broadPropagation | 473.6402 |
| uSignal | kairo | deepPropagation | 161.4608 |
| uSignal | kairo | diamond | 259.2661 |
| uSignal | kairo | mux | 491.2861 |
| uSignal | kairo | repeatedObservers | 39.3922 |
| uSignal | kairo | triangle | 100.8120 |
| uSignal | kairo | unstable | 53.6905 |
| uSignal | mol | molBench | 426.6433 |
| uSignal | s | createDataSignals | 7.2765 |
| uSignal | s | createComputations0to1 | 5.5420 |
| uSignal | s | createComputations1to1 | 37.1759 |
| uSignal | s | createComputations2to1 | 17.0992 |
| uSignal | s | createComputations4to1 | 16.3435 |
| uSignal | s | createComputations1000to1 | 9.3405 |
| uSignal | s | createComputations1to2 | 23.6983 |
| uSignal | s | createComputations1to4 | 19.8659 |
| uSignal | s | createComputations1to8 | 16.2250 |
| uSignal | s | createComputations1to1000 | 14.9683 |
| uSignal | s | updateComputations1to1 | 27.9917 |
| uSignal | s | updateComputations2to1 | 17.9494 |
| uSignal | s | updateComputations4to1 | 11.6104 |
| uSignal | s | updateComputations1000to1 | 10.0512 |
| uSignal | s | updateComputations1to2 | 24.6782 |
| uSignal | s | updateComputations1to4 | 22.0253 |
| uSignal | s | updateComputations1to1000 | 28.3095 |
| uSignal | dynamic | 10x5 - 2 sources - read 20% (simple component) | 332.2226 |
| uSignal | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 314.2962 |
| uSignal | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 387.6324 |
| uSignal | dynamic | 1000x5 - 25 sources (wide dense) | 867.6101 |
| uSignal | dynamic | 5x500 - 3 sources (deep) | 213.3604 |
| uSignal | cellx | cellx10 | 0.0463 |
| uSignal | cellx | cellx20 | 0.0338 |
| uSignal | cellx | cellx30 | 0.0476 |
| @vue/reactivity | kairo | avoidablePropagation | 173.0172 |
| @vue/reactivity | kairo | broadPropagation | 343.5973 |
| @vue/reactivity | kairo | deepPropagation | 108.9662 |
| @vue/reactivity | kairo | diamond | 175.1612 |
| @vue/reactivity | kairo | mux | 349.6600 |
| @vue/reactivity | kairo | repeatedObservers | 20.7812 |
| @vue/reactivity | kairo | triangle | 62.0267 |
| @vue/reactivity | kairo | unstable | 41.6047 |
| @vue/reactivity | mol | molBench | 300.9346 |
| @vue/reactivity | s | createDataSignals | 5.5632 |
| @vue/reactivity | s | createComputations0to1 | 4.4889 |
| @vue/reactivity | s | createComputations1to1 | 12.9417 |
| @vue/reactivity | s | createComputations2to1 | 8.3468 |
| @vue/reactivity | s | createComputations4to1 | 7.8645 |
| @vue/reactivity | s | createComputations1000to1 | 8.2388 |
| @vue/reactivity | s | createComputations1to2 | 10.9496 |
| @vue/reactivity | s | createComputations1to4 | 6.7923 |
| @vue/reactivity | s | createComputations1to8 | 6.2971 |
| @vue/reactivity | s | createComputations1to1000 | 4.6614 |
| @vue/reactivity | s | updateComputations1to1 | 18.1281 |
| @vue/reactivity | s | updateComputations2to1 | 10.3023 |
| @vue/reactivity | s | updateComputations4to1 | 7.4867 |
| @vue/reactivity | s | updateComputations1000to1 | 5.4607 |
| @vue/reactivity | s | updateComputations1to2 | 13.5691 |
| @vue/reactivity | s | updateComputations1to4 | 12.5838 |
| @vue/reactivity | s | updateComputations1to1000 | 12.0075 |
| @vue/reactivity | dynamic | 10x5 - 2 sources - read 20% (simple component) | 261.6734 |
| @vue/reactivity | dynamic | 10x10 - 6 sources - dynamic - read 20% (dynamic component) | 193.8861 |
| @vue/reactivity | dynamic | 1000x12 - 4 sources - dynamic (large web app) | 360.7533 |
| @vue/reactivity | dynamic | 1000x5 - 25 sources (wide dense) | 554.4960 |
| @vue/reactivity | dynamic | 5x500 - 3 sources (deep) | 181.7392 |
| @vue/reactivity | cellx | cellx10 | 0.0679 |
| @vue/reactivity | cellx | cellx20 | 0.0756 |
| @vue/reactivity | cellx | cellx30 | 0.0455 |
