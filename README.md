# Pokedex

An example React application built in the old way. It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Download the code

```sh
git clone https://github.com/mxstbr/pokedex
cd pokedex
yarn install
```

If you don't have `yarn` installed, run `npm install --global yarn` beforehand!

## Run the app locally

```sh
yarn start
```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### Change the delay

The API lib introduces some artificial delay to make spinners more prominent.

To improve your development speed when you don't need to see spinners you can edit the `MIN_DELAY_MS` and `MAX_DELAY_MS`variables in `src/api/pokeapi.js`!
