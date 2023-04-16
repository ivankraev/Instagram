## What's in the box

- Frontend
  - [Typescript](https://www.typescriptlang.org/)
  - [Next.js](https://nextjs.org/)
  - [MaterialUI](https://material-ui.com/)
  - [ESlint](https://eslint.org/) / [Prettier](https://prettier.io/) / [Husky](https://github.com/typicode/husky) / [Lint Staged](https://github.com/okonet/lint-staged)

## Prerequisites

```bash
$ yarn install
```

**Important commands**

| Command           | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `yarn dev`        | Build app continuously (HMR enabled) and serve @ `http://localhost:3000` |
| `yarn build`      | Build app                                                                |
| `yarn start`      | Build app once (HMR disabled)                                            |
| `yarn lint`       | Run eslint and fix issues if possible                                    |
| `yarn format`     | Run prettier and fix issues if possible                                  |
| `yarn pre-commit` | This command will run eslint and prettier in the same time               |
| `yarn commit`     | Command for commit ( use this instead of git commit )                    |

## Commit

To commit your changes, use

```bash
$ yarn commit
```

## Semantic versioning

- fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
  types other than fix: build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.

- feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).

- BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.

For more information, please check [Conventional commit](https://www.conventionalcommits.org/en/v1.0.0/)

Every commit should be tagged, so after you commit the changes, run the script

- Patch

```bash
$ yarn release:patch
```

- Minor

```bash
$ yarn release:minor
```

- Major

```bash
$ yarn release:major
```

It will automatically bump up the version, update it in package.json and create notes in
the CHANGELOG.md file.

If you want to check how your release will look like without actually
applying it you can add --dry-run after the command.

We can push our changes with the following script

```bash
$ git push --follow-tags <remote> <branchname>
```
