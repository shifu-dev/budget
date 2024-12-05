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
      <button
        title={props.label}
        style={{
          borderRadius: 50,
        }}
      >
        <Icon name={props.icon} />
      </button>
    </>
  )
}
