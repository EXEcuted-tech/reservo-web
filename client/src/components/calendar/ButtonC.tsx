import React, { MouseEvent } from 'react'
import { Button } from '@mui/base'


interface propButton{
  onClick : (event :MouseEvent<HTMLButtonElement>) => void | undefined, 
  title : any,
  isDisable?: boolean | undefined,
}

function ButtonC(props:propButton) {
  return (
    <Button onClick={event => props.onClick(event)} disabled = {props.isDisable}>{props.title}</Button>
  )
}

export default ButtonC