'use client'
import { useState } from 'react'
import { PoblacionTotalSegunSexo } from './Graficos/poblacionTotalSegunSexo'
import { Grid, Typography } from '@mui/material'
import { SelectMaterial } from './Select graficos'

export default function Home() {    

    const [ valueSelect, setValueSelect ] = useState('')

  return (

    <Grid container px={2}>
        <Grid item xs={12} sx={{textAlign:'center'}}>
            <Typography variant="h3" >
                Graficos cepal
            </Typography>
        </Grid>
        <Grid item container>
            <Grid item >
                <SelectMaterial valueSelect={valueSelect} setValueSelect={setValueSelect}/>
            </Grid>
        </Grid>
        <Grid item container justifyContent={'center'} >
            {( valueSelect == 'Población total segun sexo' ) && 
                <PoblacionTotalSegunSexo/>
            }
        </Grid>
    </Grid>
  )
}
