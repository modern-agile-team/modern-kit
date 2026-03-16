# Contributing

<p>
  <a href="./CONTRIBUTING.md">한국어</a> | <a href="./CONTRIBUTING.en.md"><b>English</b></a>
</p>

Anyone is welcome to contribute to `@modern-kit`. We appreciate every contribution! 🙏

<br />

## Issue

Please use [GitHub Issues](https://github.com/modern-agile-team/modern-kit/issues) to report bugs or suggest improvements.

- For bug reports, include **steps to reproduce** and **expected behavior** to help us resolve it quickly.
- For new feature proposals, describe the **use case** and **expected benefit**.

<br />

## Pull Request

In addition to filing an Issue, you can fork `@modern-kit`, make improvements directly, and open a Pull Request.

<br />

### Pre-work Checklist 🙏

- If you're adding a **new feature**, please open an Issue to discuss it first.
- Use **`yarn` (Berry v4+)** as the package manager.
- Use **Node `v24 (LTS)`**. You can easily switch using `nvm`.

```shell
nvm install
nvm use
```

- Before creating a PR, make sure **lint**, **typecheck**, and **test** all pass.

```shell
yarn eslint packages
yarn typecheck
yarn test
```

Or run everything at once:

```shell
yarn build
```

<br />

### Documentation 📄

Documentation is managed in the `docs` folder at the root and is powered by [Docusaurus](https://docusaurus.io/).

- You must write **both Korean (default) and English** versions of any new documentation.

| Type             | Path                                                                              |
| ---------------- | --------------------------------------------------------------------------------- |
| Korean hook doc  | `docs/docs/react/hooks/useHookName.mdx`                                           |
| English hook doc | `docs/i18n/en/docusaurus-plugin-content-docs/current/react/hooks/useHookName.mdx` |

- Refer to existing files for the document format. Use `.md` for plain documentation and `.mdx` for interactive example pages.
- MDX example components require the packages to be built first.

```shell
# Build packages (required before writing MDX examples)
yarn build
```

- You can preview your documentation in the dev server.

```shell
# Korean docs dev server
yarn start
yarn start:ko

# English docs dev server
yarn start:en
```

- The docs build must complete successfully before opening a PR.

```shell
yarn build:docs
```

<br />

## Conventional Commits

Follow this format for commit messages:

```
<type>(<package scope>): <description>

Examples:
feat(react): Add useToggle hook
fix(utils): Fix flatten edge case with empty arrays
docs(react): Add useIsClient documentation
```

<br />

### 1. Type

| Type       | Description                                             |
| ---------- | ------------------------------------------------------- |
| `feat`     | Add a new feature                                       |
| `fix`      | Fix a bug or improve existing code                      |
| `refactor` | Refactor code without changing functionality            |
| `test`     | Add or update tests                                     |
| `docs`     | Update documentation                                    |
| `chore`    | Build config, dependency updates, and other maintenance |

<br />

### 2. Package Scope

Specify the package where the change was made.

| Scope   | Target           |
| ------- | ---------------- |
| `react` | `packages/react` |
| `utils` | `packages/utils` |
| `types` | `packages/types` |

<br />

### 3. Description

Write a brief summary of the change. Use **English or Korean** in **imperative present tense**. (e.g. `Add`, `Fix`, `Update`)

<br />
