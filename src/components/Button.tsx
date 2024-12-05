import MuiButton from '@mui/material/Button'
import MuiIconButton from '@mui/material/IconButton'
import { Icon, IconName } from '@components/Icon'

export type ButtonCallback = () => void

export interface ButtonProps {
  label?: string
  icon?: IconName
  onPress?: ButtonCallback
}

export function Button(props: ButtonProps) {
  return (
    <>
      {props.label ? (
        <MuiButton
          title={props.label}
          startIcon={props.icon && <Icon name={props.icon} />}
          style={{
            borderRadius: 50,
          }}
        />
      ) : (
        <MuiIconButton children={<Icon name={props.icon} />} size='large' />
      )}
    </>
  )
}
