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

const provincias = {
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
}

const causasMuerte = {
    Tuberculosis: [],
    Sida: []
}

export const Salud = ({tipo}) => {
    const [ data, setData ] = useState([])
    const [ dimensiones, setDimensiones ] = useState([])
    const [ tiempo, setTiempo ] = useState([])
    // Estado para almacenar los resultados separados
    const [ resultadoInversiones, setResultadoDeInversiones ] = useState({...provincias})
    
    useEffect(  () => {
        const fecthData = async() => {
        const response = await fetch('/data_salud.json').then((data) => data.json()).then((data) => data)
        setData( () =>  response.body.data)
        setDimensiones(() => response.body.dimensions)
    }

    fecthData()

  },[])

    useEffect(() => {
        const tipoIdProvincia = 24
        const tipoIdTiempo = 23
        const tipoIdCausa = 975
        const tipoIdSexo = 25



        const provincia = dimensiones.filter( item => item.id == tipoIdProvincia)?.[0]?.members
        const tiempos = dimensiones.filter( item => item.id == tipoIdTiempo)?.[0]?.members
        const causa = dimensiones.filter( item => item.id == tipoIdCausa)?.[0]?.members
        const sexo = dimensiones.filter( item => item.id == tipoIdSexo)?.[0]?.members


        // Crear un objeto para agrupar los resultados por género
        const groupedResults = {...provincias};

        
        data.forEach(itemData => {
            provincia.map(itemProvincia => {
                if(itemProvincia.id == itemData[`dim_${tipoIdProvincia}`]) {
                    const anio = tiempos.find(item => item.id == itemData[`dim_${tipoIdTiempo}`])
                    const causaFind = causa.find(item => item.id == itemData[`dim_${tipoIdCausa}`])
                    const sexoFind = sexo.find(item => item.id == itemData[`dim_${tipoIdSexo}`])
                    groupedResults[itemProvincia.name].push({...itemData, tiempo: anio.name, causa: causaFind.name, sexo: sexoFind.name})
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
        responsive: true,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: `Grafico ${tipo} `,
            },
        },
    };


    const datos = () => {

        // Crear un objeto para almacenar los valores de cada grupo por año
        const valorPorTiempo = {...provincias};

        // Llenar el objeto con los valores de cada grupo
        for (const grupo in resultadoInversiones) {
            valorPorTiempo[grupo] = {};

            resultadoInversiones[grupo]?.forEach((item) => {
                const key = item.tiempo;
                valorPorTiempo[grupo + item.causa]
                console.log('item', item)

                console.log('valorPorTiempoCausa', valorPorTiempo)
                valorPorTiempo[grupo][key] = item.value;
            });
        }

        // Crear el objeto de datos para el gráfico

        const datasets = Object.keys(valorPorTiempo).map((grupo) => {
            const data = tiempo.map((item) =>
                parseFloat(valorPorTiempo[grupo][item]) || 0
            );
            const color = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
            return {
                label: grupo,
                data: data,
                backgroundColor: color,
                borderColor: color,
            };
        });

        const valoresGrafico = {
            labels: tiempo,
            datasets: datasets
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