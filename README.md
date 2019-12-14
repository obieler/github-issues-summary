<a href="https://travis-ci.com/obieler/github-issues-summary">
  <img src="https://travis-ci.com/obieler/github-issues-summary.svg?branch=master" alt="Travis build status">
</a>
<img alt="License" src="https://img.shields.io/github/license/obieler/github-issues-summary">


github-issues-summary
=====================

**Work in progress**

This package provides a summary of opened GitHub issues by label and repository.


Usage as a command line utility
-------------------------------

### Install

:warning: Not already available NPM.

```bash
npm i github-issues-summary -g
```

### Usage

```console
github-issues-summary [args]

Options:
  --version     Show version number                                    [boolean]
  -h, --help    Show help                                              [boolean]
  -c, --config  Path of config.json                          [string] [required]
```

#### Example of config.json
```json
{
  "organization": "<your organization name",
  "username": "<your GitHub username",
  "token": "<your GitHub generated token>",
  "repositories": [
    "<a Github repository name>",
    "<another Github repository name>",
    "<another Github repository name>",
    "<aonther Github repository name>",
    "<aonther Github repository name>"
  ],
  "labels": [
    "<a label>",
    "<another label>",
    "<another label>",
    "<another label>",
    "<another label>"
  ]
}
```

### Screenshot example

![CLI usage example](https://raw.github.com/obieler/github-issues-summary/master/docs/screenshot-example.png)

Using as a Node.js module
-------------------------

### Install

```bash
npm i github-issues-summary --save-dev
```

### Usage

To complete.

Contributing
-------------

To complete.

Developer
---------

  * [Olivier Bieler](https://github.com/obieler)

License
-------

The MIT License (MIT)

See the [LICENSE](LICENSE) file for more details.
