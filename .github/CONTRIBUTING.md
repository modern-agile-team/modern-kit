# Contributing
All contributions are appreciated, and anyone is welcome to contribute to the library.


<br />

## Issues
If you have any suggestions for improvements to `@modern-kit` documentation, features, or otherwise, please raise an issue.

<br />

## Pull Requests
In addition to raising issues, you can fork `@modern-kit` and raise pull requests after working on improvements yourself.

Please see the caveats below 🙏
- if you are adding a new feature, please open an issue to discuss it in advance.
- The node version should be `v18.17.1`. You can easily version match with `nvm install`, `nvm use`.
```shell
nvm install
```
```shell
nvm use
```
- Please `test` and `type check` your Pull Request before creating it.

```shell
yarn test
```
```shell
yarn typecheck
```

<br />

If you would like to contribute to the official documentation, please create a `.md` file in the `docs/prepareDocs` folder for `en` and `ko`.

![스크린샷 2023-08-20 오전 1 30 55](https://github.com/Team-Grace/devgrace/assets/64779472/b5e772c9-89e1-4e31-8647-ffb1dfc26588)


<br />

## Conventional Commits

```
<type>(<package scope>): <descriptions>

ex: feat(ui): Add Select Component
```

### Type
Type must be one of those
- feat: A new feature
- fix: A bug fix
- refactor: A code change that neither fixes a bug nor adds a feature
- test: Adding missing tests or correcting existing tests
- docs: Documentation only changes

### Package Scope
The name of package that you made changes.
- ui
- react
- utils

### Descriptions
A summary description of the changes you worked on.

<br />