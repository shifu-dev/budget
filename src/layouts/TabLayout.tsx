import { ButtonList } from '@components/ButtonList'
import { Outlet, useNavigate } from 'react-router'

export function TabLayout() {
  const navigate = useNavigate()

  return (
    <>
      <Outlet />
      <div className='tab-bar'>
        <ButtonList
          direction='horizontal'
          buttons={[
            {
              icon: 'home',
              onPress: () => navigate('/home'),
            },
            {
              icon: 'database-dollar',
              onPress: () => navigate('/transactions'),
            },
          ]}
          buttonProps={{
            variant: 'light',
          }}
        />
      </div>
    </>
  )
}
