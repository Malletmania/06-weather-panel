const ONE_MINUTE = 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const cardtemplate = `
<div class="panel">
<div class="card">
<div class="data-location">
    <h2 class="date"></h2>
    <p> <span style="color: green;">green</span> </p>
</div>
<div class="weatherData">
    <div class="data">
        <h2 class="display-2 temp"></h2>
        <div class="weatherType"></div>
        <p class="windSpeed"></p>
        <p class="humidity"></p>
    </div>
</div>
</div>
</div>`

    function extractJSON(response) {
        return response.json()
    }

    function transformDates (dates) {
        console.log(dates)
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

    async function getWeatherForCity (city) {
        const url=new URL('https://api.openweathermap.org/data/2.5/forecast?appid=eba9d75027d950e7d6df6ec873ecada2')
        url.searchParams.set("q", city)
        url.searchParams.set("units", 'imperial')
        const response = await fetch (url);
        const data = await extractJSON(response);
        const dates = transformDates(data.list);
        $('#weatherContainer').empty()
        for (const date of dates) {
            const card = $(cardtemplate)
            card.find('.date').text(moment(date.dt*1000).format('LL'))
            card.find('.windSpeed').text(`${date.wind.speed}MPH`)
            card.find('.temp').text(`${date.main.temp}F`)
            card.find('.humidity').text(`${date.main.humidity}%`)
            
            console.log(date)
            for (const weather of date.weather) {
                card.find('.weatherType').append($('<img/>').attr('src', `http://openweathermap.org/img/wn/${weather.icon}@2x.png`))
            }
            card.appendTo('#weatherContainer')
        };

    }
    getWeatherForCity('Berlin')
    $(document).ready(function(){
        $("#weatherSearch").on('submit', function(e) {
            e.preventDefault()
            getWeatherForCity($("#citySearch").val())
        })
    })
    
