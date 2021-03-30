const dataFromMars = [
    {
        date: '1 июля 2020 г.',
        temperature: '-70,7 ° F',
        windspeed: '11,5 миль/ч',
        pressure: '766,9  ПА',
    },
    {
        date: '2 июля 2020 г.',
        temperature: '-69,6 ° F',
        windspeed: '10 миль/ч',
        pressure: '765  ПА',
    },
]

async function postData(data) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            dataFromMars.push(data)
            resolve()
        }, 1500)
    })
    const res = await promise
}

async function getData() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let i = 1
                dataFromMars.forEach((dataFromMars) => {
                    document.getElementById("date" + i).innerHTML = "Дата: " + dataFromMars.date
                    document.getElementById("temperature" + i).innerHTML = "Температура: " + dataFromMars.temperature
                    document.getElementById("windspeed" + i).innerHTML = "Скорость ветра: " + dataFromMars.windspeed
                    document.querySelector('#pressure' + i).innerHTML = "Давление: " + dataFromMars.pressure
                    document.querySelector('#pressure' + i).insertAdjacentHTML('afterEnd', '<button onclick="btnClick('+i+')">Получить объект</button>')
                    i++
                })
                resolve()
            }
            catch (error) {
                let i = 1
                console.log(error)
                dataFromMars.forEach((dataFromMars) => {
                    document.getElementById("date" + i).innerHTML = "Ошибка..."
                    document.getElementById("temperature" + i).innerHTML = ""
                    document.getElementById("windspeed" + i).innerHTML = ""
                    document.getElementById("pressure" + i).innerHTML = ""
                    i++
                })
            }
        }, 1000)
    })
    const res = await promise
}

function btnClick(i){
    const {date, ...otherData} =  dataFromMars[i-1]
    console.log({date, otherData})
}

postData(
    {
        date: '3 июля 2020 г.',
        temperature: '-70,7 ° F',
        windspeed: '11,5 миль/ч',
        pressure: '766,9  ПА',
    }
).then(getData).then


