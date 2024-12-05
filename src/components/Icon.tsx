import * as TablerIcons from '@tabler/icons-react'
import { useTheme } from '@themes/index'

export type IconName =
  | 'add'
  | 'plus'
  | 'cross'
  | 'cancel'
  | 'wrong'
  | 'check'
  | 'correct'
  | 'currency-rupee'
  | 'clock'
  | 'pencil'
  | 'edit'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'arrow-down'
  | 'back'
  | 'search'
  | 'trash'

export interface IconProps {
  name?: IconName
}

export const Icon = (props: IconProps) => {
  const theme = useTheme()
  const TablerIcon = getTablerIcon(props.name)

  if (!TablerIcon) {
    return <></>
  }

  return <span {...props}>{<TablerIcon color={theme.iconColor} />}</span>
}

const _tablerIconMap = {
  none: undefined,
  add: TablerIcons.IconPlus,
  plus: TablerIcons.IconPlus,
  cross: TablerIcons.IconX,
  cancel: TablerIcons.IconX,
  wrong: TablerIcons.IconX,
  check: TablerIcons.IconCheck,
  correct: TablerIcons.IconCheck,
  'currency-rupee': TablerIcons.IconCurrencyRupee,
  clock: TablerIcons.IconClock,
  pencil: TablerIcons.IconPencil,
  edit: TablerIcons.IconPencil,
  'arrow-left': TablerIcons.IconArrowLeft,
  'arrow-right': TablerIcons.IconArrowRight,
  'arrow-up': TablerIcons.IconArrowUp,
  'arrow-down': TablerIcons.IconArrowDown,
  back: TablerIcons.IconArrowLeft,
  search: TablerIcons.IconSearch,
  trash: TablerIcons.IconTrashX,
}

const getTablerIcon = (name?: IconName): TablerIcons.Icon | undefined => {
  return _tablerIconMap[name ?? 'none']
}
