'use client';

import React, { useState } from "react"
import { SeleccionGraficos } from "../Utils/seleccionGraficos"
import { FormControl, InputLabel, Select, MenuItem, ListSubheader } from "@mui/material"

export const SelectMaterial = ({valueSelect, setValueSelect}) => {

    const renderSelectOptions = (groups) => {
        let options = [];
        groups.forEach((group, index) => {
          options.push(
            <ListSubheader key={ index }>{ group.titulo }</ListSubheader>
          );
          group.opciones.forEach(( option ) => {
            options.push(
              <MenuItem key={ option } value={ option }>
                { option }
              </MenuItem>
            );
          });
        });
        return options;
      }

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="grouped-select"> Elegir </InputLabel>
            <Select id="grouped-select" label="Elegir" value={ valueSelect } onChange={({target:{value}}) =>  setValueSelect(() => value) } >
                {renderSelectOptions( SeleccionGraficos )}
            </Select>
        </FormControl>
    )
}