import React, { MouseEvent } from 'react'
import { Button } from '@mui/base'
import { number } from 'yargs'


interface propButton{
  onClick : (event :MouseEvent<HTMLButtonElement> , count: number) => void | undefined, 
  title : any,
  isDisable?: boolean | undefined,
}

function ButtonC(props:propButton) {
  return (
    <Button onClick={(event) => props.onClick(event ,1)} disabled = {props.isDisable}>{props.title}</Button>
  )
}

export default ButtonC