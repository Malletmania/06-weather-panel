const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

    function extractJSON(response) {
        return response.json()
    }

    function transformDates (dates) {
        let results = []
        let candidateTimeStamp = Date.now()/1000
        for( let i = 0; i<dates.length; i++){
            if (candidateTimeStamp < dates[i].dt) {
                candidateTimeStamp += ONE_DAY
                results.push(dates[i])
                
            }
        }
        return results
    }

    function getWeatherForCity (city) {
        const url=new URL('https://api.openweathermap.org/data/2.5/forecast?appid=eba9d75027d950e7d6df6ec873ecada2')
        url.searchParams.set("q", city)
        return fetch(url).then(extractJSON).then(function(data){
            console.log (transformDates(data.list))
        } )
    }
    getWeatherForCity('Berlin')

    