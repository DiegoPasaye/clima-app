const inquirer = require('inquirer');
const colors = require('colors')


const menuOpts = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name:"1. Buscar ciudad"
            },
            {
                value: 2,
                name:"2. Historial"
            },
            {
                value: 0,
                name:"0. Salir"
            }
        ]
    }
]

const menuInquirer = async() =>{
    console.clear()
    console.log("==================".green)
    console.log(" Seleccione una opcion ".green)
    console.log("==================\n".green)

    const {opcion} = await inquirer.prompt(menuOpts)
    return opcion

}
const pausa = async() => {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"enter".green} para continuar`
        }
    ]
    await inquirer.prompt(question)
}

const leerInput = async(mensaje) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value){
                if(value.length == 0){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ]

    const {desc} = await inquirer.prompt(question)
    return desc
}


const listarLugares = async(lugares = []) => {
    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}`.green

        return{
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    })

    choices.unshift({
        value: 0,
        name: 0 + " Cancelar"
    })

    const preguntas = [
        {
            type:"list",
            name: "id",
            message: "Seleccione el lugar: ",
            choices
        }
    ]


    const {id} = await inquirer.prompt(preguntas)
    return id
}

module.exports = {menuInquirer, pausa, leerInput, listarLugares}