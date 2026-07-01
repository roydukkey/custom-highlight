# Contributing Guide

## Commits

Use conventional commits (https://www.conventionalcommits.org/). This enables automatic versioning and changelog creation when publishing.

## Pull Requests

Thank you for your interest in this project. I respect your time and effort. Therefore, if for any reason you have doubts on the direction of feature or even whether it's in scope for the project, please open an issue first to get discussion started before doing any work. Otherwise, ensure you follow these items:

1. **Create a feature branch -** Pull requests based of your master branch will not be accepted.
1. **Keep the repo's style -** Don't forget to run the linter before committing.
1. **Commit history -** Let your commits tell a story. Do not squash everything into one commit. Preferably, each commit should build.
1. **Focused and concise -** Keep pull requests small and scoped to one feature.
1. **Add unit tests -** Pull Requests will not be accepted without relevant tests.
1. **Add documentation -** I understand that English is not everyone first language. I can provide some assistance with the docs, but please give it your best effort.

## Development

Simply, `pnpm install` and `pnpm build`.

Here are the main scripts for the monorepo, but there may be more specialized scripts in each workspace.

<dl>
    <dt><code>build</code></dt>
    <dd>Builds all workspaces in 'production' mode.</dd>
    <dt><code>serve</code></dt>
    <dd>

Serves the `docs` workspace in 'production' mode.

</dd>
    <dt><code>dev</code></dt>
    <dd>

Serves the `docs` workspace in 'development' mode with [HMR](https://vitejs.dev/guide/features.html#hot-module-replacement) enabled.

</dd>
    <dt><code>test</code></dt>
    <dd>Runs tests for all workspaces.</dd>
    <dt><code>lint</code></dt>
    <dd>Lints all workspaces.</dd>
    <dt><code>clean</code></dt>
    <dd>Cleans all workspaces.</dd>
</dl>

## Tests

Testing is provided by [Vitest](https://vitest.dev/). In addition to the main test script, it may be useful to develop tests in [watch mode](https://vitest.dev/guide/features.html#watch-mode).

```sh
pnpm test watch
```
