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

export const TiposDeGraficos = ({options, datos, tipo}) => {

    if(tipo == 'Line') {
        return  <Line options={options} data={datos}/>
    }
    if(tipo == 'Radar') {
        return  <Radar options={options} data={datos}/>
    }
    if(tipo == 'Bar') {
        return  <Bar options={options} data={datos}/>
    }
}