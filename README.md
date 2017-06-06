# Document viewer

This viewer is Web *SPA* based on technologies:
* React
* Redux
* Webpack
* Express

## Features:

* Controls (menu, tabs, collapsible blocks) use action are saved in browser history. (A click on back button brings the application to a previous state, a forward button click re-does an action again)
* URL completely reflects state of the application (copy URL and open it in a new window -- the application restores its state)

## URL format:
``` javascript
  /{{ menu }}/{{ tab }}?collapse={{ collapseIds }}
```

## Quick start:
Before installing project, please pay attention - package dependencies are solved with [Yarn package tool](https://yarnpkg.com/lang/en/docs/install/). This package tool is quite more effective that trivial npm dependency resolver.

```
  yarn install

```
Backend mock data implemented over [Express](https://expressjs.com/).
After all dependencies are resolved you can run mock server
```
  npm run mock-server
```
And finally to run the app
```
  npm run start
```
