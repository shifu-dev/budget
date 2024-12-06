import { Text } from '@components/Text'
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
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          gap: 10,
          borderWidth: 0,
          borderRadius: 50,
          backgroundColor: theme.cardColor,
          aspectRatio: 1,
        }}
      >
        <Icon name={props.icon} />
        <Text value={props.label} category='h5' />
      </button>
    </>
  )
}
