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

function postData(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            dataFromMars.push(data)
            resolve()
        }, 1500)
    })
}

async function getData() {

    const data = await postData(
        {
            date: '3 июля 2020 г.',
            temperature: '-70,7 ° F',
            windspeed: '11,5 миль/ч',
            pressure: '766,9  ПА',
        }
    )

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let h2 = document.getElementsByTagName("h2")
                h2[0].parentNode.removeChild(h2[0])
                let i = 1
                dataFromMars.forEach((dataFromMars) => {
                    let container = document.getElementsByClassName("container")
                    let card = document.createElement("div")
                    card.setAttribute("class", "card")
                    container[0].appendChild(card)

                    let h2 = document.createElement("h2")
                    let date = document.createElement("p")
                    let temperature = document.createElement("p")
                    let windspeed = document.createElement("p")
                    let pressure = document.createElement("p")
                    let btn = document.createElement("button")

                    h2.textContent = "Данные №" + i
                    date.textContent = "Дата: " + dataFromMars.date
                    temperature.textContent = "Температура: " + dataFromMars.temperature
                    windspeed.textContent = "Скорость ветра: " + dataFromMars.windspeed
                    pressure.textContent = "Давление: " + dataFromMars.pressure
                    btn.textContent = "Получить объект"
                    btn.setAttribute("onclick", "btnClick(" + i + ")")


                    card.appendChild(h2)
                    card.appendChild(date)
                    card.appendChild(temperature)
                    card.appendChild(windspeed)
                    card.appendChild(pressure)
                    card.appendChild(btn)

                    i++
                })
                resolve()
            }
            catch (error) {
                let h2 = document.createElement("h2")
                h2.textContent = "Ошибка получения данных...."
                document.getElementsByClassName("container").appendChild(h2)
            }
        }, 1000)
    })
    const res = await promise
}

function btnClick(i) {
    const { date, ...otherData } = dataFromMars[i - 1]
    console.log({ date, otherData })
}

getData()


