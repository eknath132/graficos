'use client'
import { Grid }  from "@mui/material"
import styles from '../page.module.css'
import { useEffect, useState }  from "react"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    RadialLinearScale,
} from 'chart.js';
import { Bar, Line, Radar } from 'react-chartjs-2';
import { TiposDeGraficos } from "./tiposGraficos";

ChartJS.register(
    CategoryScale,
    RadialLinearScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const Inversiones = ({tipo}) => {
    const [ data, setData ] = useState([])
    const [ dimensiones, setDimensiones ] = useState([])
    const [ tiempo, setTiempo ] = useState([])
    // Estado para almacenar los resultados separados
    const [ resultadoInversiones, setResultadoDeInversiones ] = useState({
            'Buenos Aires' : [],
            Jujuy : [],
            Salta: [],
            Tucumán: [],
            Córdoba: [],
            'Ciudad Autónoma de Buenos Aires': [],
            Catamarca: [],
            Corrientes: [],
            'Entre Ríos': [],
            Mendoza: [],
            'La Rioja': [],
            'San Juan': [],
            'San Luis': [],
            'Santa Fe': [],
            'Santiago del Estero': [],
            Chaco: [],
            Chubut: [],
            Formosa: [],
            Misiones: [],
            Neuquén: [],
            'La Pampa': [],
            'Río Negro': [],
            'Santa Cruz': [],
            'Tierra del Fuego, Antártida e Islas del Atlántico Sur': []
    });

    useEffect(  () => {
        const fecthData = async() => {
        const response = await fetch('/data_inversiones.json').then((data) => data.json()).then((data) => data)
        setData( () =>  response.body.data)
        setDimensiones(() => response.body.dimensions)
    }

    fecthData()

  },[])

    useEffect(() => {

        const tipoIdProvincia = 24
        const tipoIdTiempo = 23

        const provincia = dimensiones.filter( item => item.id == tipoIdProvincia)?.[0]?.members
        const tiempos = dimensiones.filter( item => item.id == tipoIdTiempo)?.[0]?.members

        // Crear un objeto para agrupar los resultados por género
        const groupedResults = {
            "Buenos Aires": [],
            Jujuy: [],
            Salta: [],
            Tucumán: [],
            Córdoba: [],
            "Ciudad Autónoma de Buenos Aires": [],
            Catamarca: [],
            Corrientes: [],
            "Entre Ríos": [],
            Mendoza: [],
            "La Rioja": [],
            "San Juan": [],
            "San Luis": [],
            "Santa Fe": [],
            "Santiago del Estero": [],
            Chaco: [],
            Chubut: [],
            Formosa: [],
            Misiones: [],
            Neuquén: [],
            "La Pampa": [],
            "Río Negro": [],
            "Santa Cruz": [],
            "Tierra del Fuego, Antártida e Islas del Atlántico Sur": []
        };

        data.forEach(itemData => {
            provincia.map(itemProvincia => {
                if(itemProvincia.id == itemData[`dim_${tipoIdProvincia}`]) {
                    const anio = tiempos.find(item => item.id == itemData[`dim_${tipoIdTiempo}`])
                    groupedResults[itemProvincia.name].push({...itemData, tiempo: anio.name})
                }
            })

        })

        if( tiempos?.length > 0) {
            setTiempo(() => tiempos?.map(item => parseInt(item.name)).sort() ?? [])
        }

        // Actualizar el estado con los resultados separados por género
        setResultadoDeInversiones(groupedResults);
    }, [data, dimensiones]);

    const options = {
        // responsive: true,
        // plugins: {
        //     legend: { position: 'top' },
        //     title: { display: true, text: 'Tasa anual de crecimiento de la población total, por grupos de edad' },
        // },
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Chart.js Bar Chart',
              },
            },
    };

    const datos = () => {

        // Crear un objeto para almacenar los valores de cada grupo por año
        const valorPorTiempo = {
            "Buenos Aires": {},
            Jujuy: {},
            Salta: {},
            Tucumán: {},
            Córdoba: {},
            "Ciudad Autónoma de Buenos Aires": {},
            Catamarca: {},
            Corrientes: {},
            "Entre Ríos": {},
            Mendoza: {},
            "La Rioja": {},
            "San Juan": {},
            "San Luis": {},
            "Santa Fe": {},
            "Santiago del Estero": {},
            Chaco: {},
            Chubut: {},
            Formosa: {},
            Misiones: {},
            Neuquén: {},
            "La Pampa": {},
            "Río Negro": {},
            "Santa Cruz": {},
            "Tierra del Fuego, Antártida e Islas del Atlántico Sur": {}
        };

        // Llenar el objeto con los valores de cada grupo
        for (const grupo in resultadoInversiones) {
            valorPorTiempo[grupo] = {};
        
            resultadoInversiones[grupo].forEach((item) => {
                const key = item.tiempo;
                valorPorTiempo[grupo][key] = item.value;
            });
        }

        // Crear arrays de valores para cada grupo con la misma longitud
        const totalBuenosAires = tiempo.map((item) => parseFloat(valorPorTiempo['Buenos Aires'][item]) || 0);
        const totalJujuy = tiempo.map((item) => parseFloat(valorPorTiempo.Jujuy[item]) || 0);
        const totalSalta = tiempo.map((item) => parseFloat(valorPorTiempo.Salta[item]) || 0);
        const totalTucumán = tiempo.map((item) => parseFloat(valorPorTiempo.Tucumán[item]) || 0);
        const totalCórdoba = tiempo.map((item) => parseFloat(valorPorTiempo.Córdoba[item]) || 0);
        const totalCiudadAutónomadeBuenosAires = tiempo.map((item) => parseFloat(valorPorTiempo['Ciudad Autónoma de Buenos Aires'][item]) || 0);
        const totalEntreRíos = tiempo.map((item) => parseFloat(valorPorTiempo['Entre Ríos'][item]) || 0);
        const totalCatamarca = tiempo.map((item) => parseFloat(valorPorTiempo.Catamarca[item]) || 0);
        const totalCorrientes = tiempo.map((item) => parseFloat(valorPorTiempo.Corrientes[item]) || 0);
        const totalMendoza = tiempo.map((item) => parseFloat(valorPorTiempo.Mendoza[item]) || 0);
        const totalLaRioja = tiempo.map((item) => parseFloat(valorPorTiempo['La Rioja'][item]) || 0);
        const totalSanJuan = tiempo.map((item) => parseFloat(valorPorTiempo['San Juan'][item]) || 0);
        const totalSanLuis = tiempo.map((item) => parseFloat(valorPorTiempo['San Luis'][item]) || 0);
        const totalSantaFe = tiempo.map((item) => parseFloat(valorPorTiempo['Santa Fe'][item]) || 0);
        const totalSantiagodelEstero = tiempo.map((item) => parseFloat(valorPorTiempo['Santiago del Estero'][item]) || 0);
        const totalChaco = tiempo.map((item) => parseFloat(valorPorTiempo.Chaco[item]) || 0);
        const totalChubut = tiempo.map((item) => parseFloat(valorPorTiempo.Chubut[item]) || 0);
        const totalFormosa = tiempo.map((item) => parseFloat(valorPorTiempo.Formosa[item]) || 0);
        const totalMisiones = tiempo.map((item) => parseFloat(valorPorTiempo.Misiones[item]) || 0);
        const totalNeuquén = tiempo.map((item) => parseFloat(valorPorTiempo.Neuquén[item]) || 0);
        const totalLaPampa = tiempo.map((item) => parseFloat(valorPorTiempo['La Pampa'][item]) || 0);
        const totalRíoNegro = tiempo.map((item) => parseFloat(valorPorTiempo['Río Negro'][item]) || 0);
        const totalSantaCruz = tiempo.map((item) => parseFloat(valorPorTiempo['Santa Cruz'][item]) || 0);
        const totalTierradelFuego = tiempo.map((item) => parseFloat(valorPorTiempo['Tierra del Fuego, Antártida e Islas del Atlántico Sur'][item]) || 0);

        // Crear el objeto de datos para el gráfico
        const valoresGrafico = {
            labels: tiempo,
            datasets: [
                {
                    label: 'Buenos Aires',
                    data: totalBuenosAires,
                    borderColor: 'rgba(255, 0, 0, 1)', // Rojo
                    backgroundColor: 'rgba(255, 0, 0, 0.5)', // Rojo con transparencia
                },
                {
                    label: 'Jujuy',
                    data: totalJujuy,
                    borderColor: 'rgba(255, 128, 0, 1)', // Naranja
                    backgroundColor: 'rgba(255, 128, 0, 0.5)', // Naranja con transparencia
                },
                {
                    label: 'Salta',
                    data: totalSalta,
                    borderColor: 'rgba(0, 128, 255, 1)', // Azul
                    backgroundColor: 'rgba(0, 128, 255, 0.5)', // Azul con transparencia
                },
                {
                    label: 'Tucumán',
                    data: totalTucumán,
                    borderColor: 'rgba(128, 0, 255, 1)', // Morado
                    backgroundColor: 'rgba(128, 0, 255, 0.5)', // Morado con transparencia
                },
                {
                    label: 'Córdoba',
                    data: totalCórdoba,
                    borderColor: 'rgba(255, 51, 51, 1)', // Rojo claro
                    backgroundColor: 'rgba(255, 51, 51, 0.5)', // Rojo claro con transparencia
                },
                {
                    label: 'Ciudad Autónoma de Buenos Aires',
                    data: totalCiudadAutónomadeBuenosAires,
                    borderColor: 'rgba(51, 255, 51, 1)', // Verde
                    backgroundColor: 'rgba(51, 255, 51, 0.5)', // Verde con transparencia
                },
                {
                    label: 'Entre Ríos',
                    data: totalEntreRíos,
                    borderColor: 'rgba(255, 255, 0, 1)', // Amarillo
                    backgroundColor: 'rgba(255, 255, 0, 0.5)', // Amarillo con transparencia
                },
                {
                    label: 'Catamarca',
                    data: totalCatamarca,
                    borderColor: 'rgba(0, 102, 204, 1)', // Azul oscuro
                    backgroundColor: 'rgba(0, 102, 204, 0.5)', // Azul oscuro con transparencia
                },
                {
                    label: 'Corrientes',
                    data: totalCorrientes,
                    borderColor: 'rgba(204, 0, 204, 1)', // Magenta
                    backgroundColor: 'rgba(204, 0, 204, 0.5)', // Magenta con transparencia
                },
                {
                    label: 'Mendoza',
                    data: totalMendoza,
                    borderColor: 'rgba(255, 102, 0, 1)', // Naranja oscuro
                    backgroundColor: 'rgba(255, 102, 0, 0.5)', // Naranja oscuro con transparencia
                },
                {
                    label: 'Salta',
                    data: totalSalta,
                    borderColor: 'rgba(255, 179, 102, 1)', // Naranja claro
                    backgroundColor: 'rgba(255, 179, 102, 0.5)', // Naranja claro con transparencia
                },
                {
                    label: 'La Rioja',
                    data: totalLaRioja,
                    borderColor: 'rgba(102, 102, 204, 1)', // Morado claro
                    backgroundColor: 'rgba(102, 102, 204, 0.5)', // Morado claro con transparencia
                },
                {
                    label: 'San Juan',
                    data: totalSanJuan,
                    borderColor: 'rgba(255, 102, 102, 1)', // Rosa melocotón
                    backgroundColor: 'rgba(255, 102, 102, 0.5)', // Rosa melocotón con transparencia
                },
                {
                    label: 'San Luis',
                    data: totalSanLuis,
                    borderColor: 'rgba(0, 153, 0, 1)', // Verde oscuro
                    backgroundColor: 'rgba(0, 153, 0, 0.5)', // Verde oscuro con transparencia
                },
                {
                    label: 'Santa Fe',
                    data: totalSantaFe,
                    borderColor: 'rgba(102, 102, 255, 1)', // Azul lavanda
                    backgroundColor: 'rgba(102, 102, 255, 0.5)', // Azul lavanda con transparencia
                },
                {
                    label: 'Santiago del Estero',
                    data: totalSantiagodelEstero,
                    borderColor: 'rgba(255, 102, 255, 1)', // Malva
                    backgroundColor: 'rgba(255, 102, 255, 0.5)', // Malva con transparencia
                },
                {
                    label: 'Chaco',
                    data: totalChaco,
                    borderColor: 'rgba(255, 179, 153, 1)', // Melocotón claro
                    backgroundColor: 'rgba(255, 179, 153, 0.5)', // Melocotón claro con transparencia
                },
                {
                    label: 'Chubut',
                    data: totalChubut,
                    borderColor: 'rgba(153, 255, 153, 1)', // Verde menta
                    backgroundColor: 'rgba(153, 255, 153, 0.5)', // Verde menta con transparencia
                },
                {
                    label: 'Formosa',
                    data: totalFormosa,
                    borderColor: 'rgba(255, 0, 153, 1)', // Rosa suave
                    backgroundColor: 'rgba(255, 0, 153, 0.5)', // Rosa suave con transparencia
                },
                {
                    label: 'Misiones',
                    data: totalMisiones,
                    borderColor: 'rgba(153, 153, 0, 1)', // Amarillo suave
                    backgroundColor: 'rgba(153, 153, 0, 0.5)', // Amarillo suave con transparencia
                },
                {
                    label: 'Neuquén',
                    data: totalNeuquén,
                    borderColor: 'rgba(0, 204, 204, 1)', // Azul claro
                    backgroundColor: 'rgba(0, 204, 204, 0.5)', // Azul claro con transparencia
                },
                {
                    label: 'La Pampa',
                    data: totalLaPampa,
                    borderColor: 'rgba(204, 0, 204, 1)', // Magenta oscuro
                    backgroundColor: 'rgba(204, 0, 204, 0.5)', // Magenta oscuro con transparencia
                },
                {
                    label: 'Río Negro',
                    data: totalRíoNegro,
                    borderColor: 'rgba(0, 255, 0, 1)', // Verde claro
                    backgroundColor: 'rgba(0, 255, 0, 0.5)', // Verde claro con transparencia
                },
                {
                    label: 'Santa Cruz',
                    data: totalSantaCruz,
                    borderColor: 'rgba(255, 0, 102, 1)', // Rosa claro
                    backgroundColor: 'rgba(255, 0, 102, 0.5)', // Rosa claro con transparencia
                },
                {
                    label: 'Tierra del Fuego',
                    data: totalTierradelFuego,
                    borderColor: 'rgba(0, 204, 255, 1)', // Celeste
                    backgroundColor: 'rgba(0, 204, 255, 0.5)', // Celeste con transparencia
                }
            ]
        };

        return valoresGrafico;
    }
    return (
        <Grid item container justifyContent={'center'}>
            <Grid item sx={{width:'80%', display:'flex', justifyContent:'center'}}>
                <TiposDeGraficos options={options} datos={datos()} tipo={tipo} />
            </Grid>
        </Grid>
    )
}