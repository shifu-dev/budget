import { NavigateOptions, useNavigate } from 'react-router'
import { Button, ButtonProps } from '@components/Button'

export interface NavButtonProps extends ButtonProps {
  to: string
  options?: NavigateOptions
}

export function NavButton(props: NavButtonProps) {
  const navigate = useNavigate()

  function onPress() {
    navigate(props.to, props.options)

    props.onPress?.()
  }

  return <Button {...props} onPress={onPress} />
}
