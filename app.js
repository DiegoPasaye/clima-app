require('dotenv').config()

const {menuInquirer, pausa, leerInput, listarLugares} = require('./helpers/menuInquirer');
const Busquedas = require('./models/Busquedas');


const main = async() => {
    console.clear()
    let opt = 0;
    const busquedas = new Busquedas()

    do{
        opt = await menuInquirer();

        switch (opt) {
            case 1:

                const lugarBusqueda = await leerInput('Ciudad: ')
                const lugares = await busquedas.ciudad(lugarBusqueda)

                const idSeleccionado = await listarLugares(lugares)

                if(idSeleccionado == 0) continue;
                
                const lugarSel = lugares.find(l => l.id == idSeleccionado)
                busquedas.agregarHistorial(lugarSel.nombre)

                const clima = await busquedas.clima(lugarSel.lat, lugarSel.lng)

                console.clear()
                console.log('\n Informacion de la ciudad: \n'.green)
                console.log(`Ciudad: ${lugarSel.nombre}`)
                console.log(`Latitud: ${lugarSel.lat}`)
                console.log(`Longitud: ${lugarSel.lng}`)
                console.log('Temperatura: ',clima.temp)
                console.log('Temperatura minima: ',clima.min)
                console.log('Temperatura Maxima: ',clima.max)
                console.log('Como esta el clima?', clima.desc)
                break;
            case 2:
                busquedas.historial.forEach((lugar, i) => {
                    const idx = `${i+1}`
                    console.log(`${idx} ${lugar}`)
                })
                break;
        }

        await pausa()

    }while(opt != 0)
}

main()