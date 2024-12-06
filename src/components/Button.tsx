import { Icon, IconName } from '@components/Icon'
import { useTheme } from '@themes/index'

export type ButtonCallback = () => void

export interface ButtonProps {
  label?: string
  icon?: IconName
  onPress?: ButtonCallback
}

export function Button(props: ButtonProps) {
  const theme = useTheme()

  return (
    <>
      <button
        title={props.label}
        style={{
          borderWidth: 0,
          borderRadius: 50,
          backgroundColor: theme.cardColor,
          aspectRatio: 1,
        }}
      >
        <Icon name={props.icon} />
      </button>
    </>
  )
}
