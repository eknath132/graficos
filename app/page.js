'use client'
import { useState } from 'react'
import { PoblacionTotalSegunSexo } from './Graficos/poblacionTotalSegunSexo'
import { Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { SelectMaterial } from './Select graficos'
import { TasaAnualCrecimientoPorEdad } from './Graficos/tasaAnualCrecimientoPorEdad'
import { Inversiones } from './Graficos/inversiones'

const tipos = ['Bar', 'Line', 'Radar']

export default function Home() {    

    const [ valueSelect, setValueSelect ] = useState('')
    const [ tipo, setTipo ] = useState('Line') 

  return (

    <Grid container px={2}>
        <Grid item xs={12} sx={{textAlign:'center'}}>
            <Typography variant="h3" >
                Graficos cepal
            </Typography>
        </Grid>
        <Grid item container alignItems={'center'}>
            <Grid item >
                <Select
                    // labelId="demo-simple-select-label"
                    // id="demo-simple-select"
                    value={tipo}
                    label="Tipo"
                    onChange={ (e) => setTipo( () => e.target.value )}
                >
                    {tipos.map(tipo => { 
                        return (
                            <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                        )
                    })}
                    
                </Select>
            </Grid>
            <Grid item >
                <SelectMaterial valueSelect={valueSelect} setValueSelect={setValueSelect}/>
            </Grid>
        </Grid>
        <Grid item container justifyContent={'center'} >
            {( valueSelect == 'Población total segun sexo' ) && 
                <PoblacionTotalSegunSexo/>
            }
            {(valueSelect == 'Tasa anual de crecimiento de la población total, por grupos de edad') && 
                <TasaAnualCrecimientoPorEdad/>
            }
            {(valueSelect == 'Inversiones') && 
                <Inversiones tipo={tipo}/>
            }
        </Grid>
    </Grid>
  )
}
