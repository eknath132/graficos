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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const PoblacionTotalSegunSexo = () => {
    const [ data, setData ] = useState([])
    const [ dimensiones, setDimensiones ] = useState([])
    const [ tiempo, setTiempo ] = useState([])
    // Estado para almacenar los resultados separados
    const [ resultadoGenero, setResultadoGenero ] = useState({
        Hombres: [],
        Mujeres: [],
        "Ambos sexos": [],
    });

    useEffect(  () => {
        const fecthData = async() => {
        const response = await fetch('https://api-cepalstat.cepal.org/cepalstat/api/v1/indicator/1/data?members=216%2C146%2C265%2C266%2C29119%2C29118%2C29120%2C29121%2C29122%2C29123%2C29124%2C29125%2C29126%2C29127%2C29128%2C29129%2C29130%2C29131%2C29132%2C29133%2C29134%2C29135%2C29136%2C29137%2C29138%2C29139%2C29140%2C29141%2C29142%2C29143%2C29144%2C29145%2C29146%2C29147%2C29150%2C29151%2C29152%2C29153%2C29154%2C29155%2C29156%2C29157%2C29158%2C29159%2C29160%2C29161%2C29162%2C29163%2C29164%2C29165%2C29166%2C29167%2C29168%2C29169%2C29170%2C29171%2C29172%2C29173%2C29174%2C29175%2C29176%2C29177%2C29178%2C29179%2C29180%2C29181%2C29182%2C29183%2C29184%2C29185%2C29186%2C29187%2C29188%2C29189%2C29190%2C29191%2C29192%2C29193%2C29194%2C29195%2C29196%2C29197%2C29198%2C29199%2C29200%2C29201%2C29202%2C29203%2C29204%2C29205%2C29206%2C29207%2C29208%2C29209%2C29210%2C29211%2C29212%2C29213%2C29214%2C29215%2C29216%2C29217%2C29218%2C29219%2C29220%2C32096%2C32097%2C32098%2C32099%2C32100%2C32101%2C32102%2C32103%2C32104%2C32105%2C32106%2C32107%2C32108%2C32109%2C32110%2C32111%2C32112%2C32113%2C32114%2C32115%2C32116%2C32117%2C32118%2C32119%2C32120%2C32121%2C32122%2C32123%2C32124%2C32125%2C32126%2C32127%2C32128%2C32129%2C32130%2C32131%2C32132%2C32133%2C32134%2C32135%2C32136%2C32137%2C32138%2C32139%2C32140%2C32141%2C32142%2C32143%2C32144%2C32145&lang=es&format=json&in=1&app=dashboard').then((data) => data.json()).then((data) => data)
        setData( () =>  response.body.data)
        setDimensiones(() => response.body.dimensions)
    }

    fecthData()

  },[])

    useEffect(() => {

        const tipoIdSexo = 144
        const tipoIdTiempo = 29117

        const sexos = dimensiones.filter( item => item.id == tipoIdSexo)?.[0]?.members
        const tiempos = dimensiones.filter( item => item.id == tipoIdTiempo)?.[0]?.members

        // Crear un objeto para agrupar los resultados por género
        const groupedResults = {
            Hombres: [],
            Mujeres: [],
            "Ambos sexos": [],
        };

        data.forEach(itemData => {
            sexos.map(itemSexos => {
                if(itemSexos.id == itemData[`dim_${tipoIdSexo}`]) {
                    const anio = tiempos.find(item => item.id == itemData[`dim_${tipoIdTiempo}`])
                    groupedResults[itemSexos.name].push({...itemData, tiempo: anio.name})
                }
            })

        })

        // data.forEach(item => {
        //     const dimensionNames = Object.keys(item)
        //     .filter(key => key.startsWith("dim_"))
        //     .map(dimensionId => {
        //         const dimension = dimensionMapping[parseInt(dimensionId.slice(4))];
        //         return dimension ? dimension.members.find(member => member.id === item[dimensionId]).name : "";
        //     });
        //     // Agrupar los resultados según el género
        //     const gender = dimensionNames[0];
        //     if (groupedResults[gender]) {
        //         groupedResults[gender].push({
        //             Value: item.value,
        //             ...dimensionNames.slice(1).reduce((acc, name, index) => {
        //             acc[`Member${index + 1}`] = name;
        //             return acc;
        //         }, {}),
        //     })}
        // });

        if( tiempos?.length > 0) {
            setTiempo(() => tiempos?.map(item => parseInt(item.name)).sort() ?? [])
        }

        // Actualizar el estado con los resultados separados por género
        setResultadoGenero(groupedResults);
    }, [data, dimensiones]);

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Población total, según sexo' },
        },
    };

    const datos = () => {

        // Crear un objeto para almacenar los valores de cada grupo por año
        const valorPorTiempo = {
            Hombres: {},
            Mujeres: {},
            "Ambos sexos": {},
        };

        // Llenar el objeto con los valores de cada grupo
        resultadoGenero.Hombres.forEach((item) => {
            valorPorTiempo.Hombres[item.tiempo] = item.value;
        });

        resultadoGenero.Mujeres.forEach((item) => {
            valorPorTiempo.Mujeres[item.tiempo] = item.value;
        });

        resultadoGenero['Ambos sexos'].forEach((item) => {
            valorPorTiempo['Ambos sexos'][item.tiempo] = item.value;
        });

        // Crear arrays de valores para cada grupo con la misma longitud
        const hombresValores = tiempo.map((item) => parseInt(valorPorTiempo.Hombres[item]) || 0);
        const mujeresValores = tiempo.map((item) => parseInt(valorPorTiempo.Mujeres[item]) || 0);
        const ambosSexosValores = tiempo.map((item) => parseInt(valorPorTiempo['Ambos sexos'][item]) || 0);

        // Crear el objeto de datos para el gráfico
        const valoresGrafico = {
            labels: tiempo,
            datasets: [
                {
                    label: 'Ambos sexos',
                    data: ambosSexosValores,
                    borderColor: 'red',
                    backgroundColor: 'red',
                },
                {
                    label: 'Hombres',
                    data: hombresValores,
                    borderColor: 'yellow',
                    backgroundColor: 'yellow',
                },
                {
                    label: 'Mujeres',
                    data: mujeresValores,
                    borderColor: 'blue',
                    backgroundColor: 'blue',
                }
            ]
        };

        return valoresGrafico;
    }
    return (
        <Grid item className={styles.graph}>
            <Line options={options} data={datos()}/>
        </Grid> 
    )
}