Sääkino is an application that suggests movies to you based on a location's weather.

## How to run it locally
1. Clone the repository and run `npm install` to install dependencies.
2. Register to [The Movie Database](https://www.themoviedb.org/documentation/api) and [OpenWeatherMap](https://openweathermap.org/api) and acquire your own API key
3. Create a file named `.env` to the root of your cloned repository
4. Create the following environmental variables:
```
REACT_APP_TMDBKEY=[YOUR_TMDB_KEY]
REACT_APP_WEATHERKEY=[YOUR_OPENWEATHERMAP_KEY]
```
5. Start you application by running `npm run dev` on the root of your project.
