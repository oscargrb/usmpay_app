//
//
const ip = 'http://192.168.1.100'

const ApiService = {
    url:`${ip}:3500`,
    urlBankAutomate:`${ip}:3531`,
    rutas: [
        {
            id: 1,
            nbRuta: "La California",
            precio: 9,
            color: "#b00"
        },
        {
            id: 2,
            nbRuta: "Plaza Venezuela",
            precio: 11,
            color: "#0b0"
        },
        {
            id: 3,
            nbRuta: "Guatire / Guarenas",
            precio: 13,
            color: "#00b"
        },
        {
            id: 4,
            nbRuta: "Los Teques",
            precio: 15,
            color: "#bb0"
        },
    ]
}

export default ApiService