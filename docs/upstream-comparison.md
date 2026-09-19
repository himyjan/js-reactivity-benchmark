# Upstream comparison

Compared this fork at [`801875b`](https://github.com/transitive-bullshit/js-reactivity-benchmark/commit/801875b) with the upstream `main` branch at [`56eb45e`](https://github.com/milomg/js-reactivity-benchmark/commit/56eb45e), fetched on 2026-09-19. Upstream is 52 commits ahead of this fork, but its latest commit is from 2026-02-14 and the fork's current benchmark refresh is newer.

## Recommendation

There is no upstream feature that should be copied wholesale. Upstream has since moved to a three-package workspace (`packages/core`, `packages/node`, and `packages/web`) and keeps a much broader experimental framework set. That architecture would conflict with this fork's newer correctness checks, CLI, worker isolation, report format, and explicit framework-selection decisions.

The useful upstream ideas are small and can be considered independently:

| Upstream change | Assessment for this fork |
| --- | --- |
| More warmup passes, including a tick between passes | Worth considering for timing stability. The current fork already warms each suite and takes repeated minimum samples, but `src/dynamicBench.ts` currently has one warmup run and `src/kairoBench.ts` one warmup invocation. Upstream's extra post-tick pass is a focused experiment rather than a required compatibility fix. See [`a7ee632`](https://github.com/milomg/js-reactivity-benchmark/commit/a7ee63219bd5f616524393b0a385c3e3dc7a313e) and [`cffbce1`](https://github.com/milomg/js-reactivity-benchmark/commit/cffbce1f7c992918b7e1dbc4f3a3c2854f2f14d0). |
| Benchmark each framework in a warmup phase before the measured phase | Already largely covered by this fork's per-framework worker processes and suite warmups. The idea is useful if repeated runs show startup or JIT order effects, but upstream's loop restructuring cannot be transplanted directly. See [`cffbce1`](https://github.com/milomg/js-reactivity-benchmark/commit/cffbce1f7c992918b7e1dbc4f3a3c2854f2f14d0). |
| Disable Oby because CellX tests fail | Already reflected in the fork's adapter policy: Oby is included in the current default set because this fork's adapter tests and benchmark run pass. Keep the fork's evidence-based result rather than copying upstream's historical disable. See [`3243bad`](https://github.com/milomg/js-reactivity-benchmark/commit/3243bad56cf941e3bb4f450af02bc5143817c4cb). |
| Angular scheduler/injector refresh and `ngDevMode` build define | Angular was updated beyond upstream in this fork (`@angular/core` 22.1.7 versus upstream 21.1.4), and this fork runs the Node/Vite benchmark path. The `ngDevMode: false` web define is only relevant if the web app is restored. See [`9191f18`](https://github.com/milomg/js-reactivity-benchmark/commit/9191f18c22eb963e442763adefbc2128d92c09b3) and [`56eb45e`](https://github.com/milomg/js-reactivity-benchmark/commit/56eb45e84b3f6fcfa867840725e66b59a9b7467a). |
| Vite 8 migration | Already surpassed: this fork uses Vite 8.3.0, while upstream pins `vite` 8.0.0-beta.14 for its separate web package. Do not downgrade or copy its Rolldown configuration without a browser build to validate it. See [`56eb45e`](https://github.com/milomg/js-reactivity-benchmark/commit/56eb45e84b3f6fcfa867840725e66b59a9b7467a). |
| Package refreshes | Upstream's latest dependency set is behind the fork for the benchmark's main dependencies: Angular 21.1.4, Alien Signals 3.1.2, Pota 0.20.226, and Vitest 4.0.18 versus the fork's Angular 22.1.7, Alien Signals 3.2.1, Pota 0.22.235, and Vitest 5.0.1. No upstream package update is a candidate for backporting. See [`56eb45e`](https://github.com/milomg/js-reactivity-benchmark/commit/56eb45e84b3f6fcfa867840725e66b59a9b7467a) and the fork's [`package.json`](../package.json). |

## Framework scope

Upstream's current default list retains `Reactively`, `s-js`, `Compostate`, and `x-reactivity`, while disabling Oby, `$mol_wire`, and the TC39 Signals adapter for failing tests or cleanup issues. This fork deliberately removed Reactively and S.js because their releases were stale, and removed old or unsuitable adapters while retaining their workload families. The upstream list therefore does not establish that those engines are current or useful additions; it is a different scope choice. See upstream's [`frameworksList.ts`](https://github.com/milomg/js-reactivity-benchmark/blob/56eb45e84b3f6fcfa867840725e66b59a9b7467a/packages/core/src/frameworksList.ts) and the fork's [`registry.ts`](../src/registry.ts).

Upstream did not add a newer major signal engine after the Pota contribution. The only notable framework-side changes after Pota are adapter cleanup and Angular maintenance. Pota was already incorporated from [`aeb9211`](https://github.com/milomg/js-reactivity-benchmark/commit/aeb921183b89207a3c562118714565559f81ac79) in this fork.

## Commit timeline after the Pota contribution

- [`878561a`](https://github.com/milomg/js-reactivity-benchmark/commit/878561ad5a169b0763372de7f3bcc2b8c60de06) changes cleanup ownership for Alien Signals, MobX, Oby, and Vue. The fork has its own cleanup registry and lifecycle tests, so these changes need adapter-specific validation before any port.
- [`3243bad`](https://github.com/milomg/js-reactivity-benchmark/commit/3243bad56cf941e3bb4f450af02bc5143817c4cb) disables Oby after CellX failures.
- [`9191f18`](https://github.com/milomg/js-reactivity-benchmark/commit/9191f18c22eb963e442763adefbc2128d92c09b3) updates Angular to a prerelease and changes its private scheduler integration.
- [`3ed3629`](https://github.com/milomg/js-reactivity-benchmark/commit/3ed362918ab5736fc1fba9593c6d2df21ca10249) changes S.js-style batch semantics and disables several upstream adapters after failures. The fork's benchmark semantics and assertions are different, so this is not a safe direct patch.
- [`3865e5c`](https://github.com/milomg/js-reactivity-benchmark/commit/3865e5c99137edc0d923ccc6cab5553fdf475dd0) through [`6100c1c`](https://github.com/milomg/js-reactivity-benchmark/commit/6100c1cc212e4691aeb11e9dd4aeebe4e5ec806a) update dependencies and benchmark timing/cleanup details. The fork has newer pinned versions and a separate runner.
- [`a7ee632`](https://github.com/milomg/js-reactivity-benchmark/commit/a7ee63219bd5f616524393b0a385c3e3dc7a313e) and [`cffbce1`](https://github.com/milomg/js-reactivity-benchmark/commit/cffbce1f7c992918b7e1dbc4f3a3c2854f2f14d0) add warmup/tick work and reduce timing variability. These are the only upstream methodology changes worth a targeted local experiment.
- [`56eb45e`](https://github.com/milomg/js-reactivity-benchmark/commit/56eb45e84b3f6fcfa867840725e66b59a9b7467a) fixes Angular's development-mode define for its web build and moves that project to Vite 8 beta. Both are superseded or out of scope here.

## Suggested follow-up

If timing reproducibility remains a concern, run a controlled A/B benchmark that adds two warmup passes plus `await nextTick()` to the dynamic and Kairo suites, keeping the fork's worker isolation and current result validation. Compare sample variance and rankings before changing the snapshot methodology. No dependency, framework, or workspace migration is justified by the upstream diff alone.
