import * as TablerIcons from '@tabler/icons-react'
import { useTheme } from '@themes/index'
import { ColorValue } from '@themes/Colors'
import { CSSProperties } from 'react'

export type IconSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type IconName =
  | 'add'
  | 'plus'
  | 'cross'
  | 'cancel'
  | 'wrong'
  | 'check'
  | 'accept'
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
  | 'notes'
  | 'chevron-left'
  | 'chevron-right'
  | 'prev'
  | 'next'
  | 'category'
  | 'category-filled'
  | 'tag'
  | 'tag-filled'
  | 'home'
  | 'home-filled'

export interface IconProps {
  name?: IconName
  size?: IconSize
  color?: ColorValue
  style?: CSSProperties
}

export const Icon = (props: IconProps) => {
  const theme = useTheme()
  const TablerIcon = _getTablerIcon(props.name)

  if (!TablerIcon) {
    return <></>
  }

  const size = _getSize(props.size)

  return (
    <span
      style={{
        ...{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          aspectRatio: 1,
          height: size,
        },
        ...props.style,
      }}
    >
      {<TablerIcon color={props.color ?? theme.colors.primary} />}
    </span>
  )
}

const _tablerIconMap = {
  none: undefined,
  add: TablerIcons.IconPlus,
  plus: TablerIcons.IconPlus,
  cross: TablerIcons.IconX,
  cancel: TablerIcons.IconX,
  wrong: TablerIcons.IconX,
  check: TablerIcons.IconCheck,
  accept: TablerIcons.IconCheck,
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
  notes: TablerIcons.IconNotes,
  'chevron-left': TablerIcons.IconChevronLeft,
  'chevron-right': TablerIcons.IconChevronRight,
  prev: TablerIcons.IconChevronLeft,
  next: TablerIcons.IconChevronRight,
  category: TablerIcons.IconCategory,
  'category-filled': TablerIcons.IconCategoryFilled,
  tag: TablerIcons.IconTag,
  'tag-filled': TablerIcons.IconTagFilled,
  'home': TablerIcons.IconHome,
  'home-filled': TablerIcons.IconHomeFilled,
}

const _getTablerIcon = (name?: IconName): TablerIcons.Icon | undefined => {
  return _tablerIconMap[name ?? 'none']
}

const _sizeMap: Record<IconSize, number> = {
  sm: 40,
  md: 60,
  lg: 80,
  xl: 100,
  xxl: 120,
}

const _getSize = (size?: IconSize): number | undefined => {
  return _sizeMap[size ?? 'md']
}
