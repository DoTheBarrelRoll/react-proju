let list = {
    "genres": [
        {
            "Clear": [28, 35, 10751, 12, 878],
            "name": "Action, Comedy, Family, Adventure, Science Fiction"
        },
        {
            "Snow": [16, 10402, 10770],
            "name": "Animation, Music, TV movie"
        },
        {
            "Rain": [99, 18, 36, 10749],
            "name": "Documentary, Drama, History, Romance"
        },
        {
            "Drizzle": [99, 18, 36, 10749],
            "name": "Documentary, Drama, History, Romance"
        },
        {
            "Clouds": [14, 36, 9648],
            "name": "Fantasy, History, Mystery"
        },
        {
            "Thunderstorm": [53, 10752],
            "name": "Thriller, War"
        },
        {
            "Fog": [80, 27],
            "name": "Crime, Horror"
        },
        {
            "Mist": [80, 27],
            "name": "Crime, Horror"
        },
        {
            "Smoke": [80, 37],
            "name": "Crime, Western"
        },
        {
            "Ash": 37,
            "name": "Western"
        },
        {
            "Sand": 37,
            "name": "Western"
        },
    ]
}

exports.getName = (code) => {

    for (let i = 0; i < list.genres.length; i++) {
        if (list.genres[i].hasOwnProperty(code)) {
            return list.genres[i][code];
        }
    }
}