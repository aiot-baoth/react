import LogoutIcon from '@mui/icons-material/Logout'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Dropdown, type MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import { Avatar } from '@/components/atoms'

export type UserMenuUser = { name: string; email?: string; avatar?: string }

export type UserMenuProps = {
  user: UserMenuUser
  onProfile?: () => void
  onSettings?: () => void
  onLogout: () => void
  /** Ẩn tên, chỉ hiện avatar (màn hình nhỏ) */
  compact?: boolean
}

/** Molecule: Avatar + tên người dùng, bấm mở menu Hồ sơ / Cài đặt / Đăng xuất. */
export function UserMenu({ user, onProfile, onSettings, onLogout, compact }: UserMenuProps) {
  const { t } = useTranslation()

  const items: MenuProps['items'] = [
    {
      key: 'info',
      disabled: true,
      label: (
        <div className="flex flex-col py-1">
          <span className="font-semibold text-text">{user.name}</span>
          {user.email && <span className="text-xs text-text-secondary">{user.email}</span>}
        </div>
      ),
    },
    { type: 'divider' },
    onProfile && {
      key: 'profile',
      icon: <PersonOutlinedIcon fontSize="small" />,
      label: t('menu.profile'),
      onClick: onProfile,
    },
    onSettings && {
      key: 'settings',
      icon: <SettingsOutlinedIcon fontSize="small" />,
      label: t('menu.settings'),
      onClick: onSettings,
    },
    {
      key: 'logout',
      danger: true,
      icon: <LogoutIcon fontSize="small" />,
      label: t('menu.logout'),
      onClick: onLogout,
    },
  ].filter(Boolean) as MenuProps['items']

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <button
        type="button"
        aria-label={user.name}
        className="flex items-center gap-2 rounded-app border-0 bg-transparent px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10"
      >
        <Avatar name={user.name} src={user.avatar} size="small" />
        {!compact && <span className="text-sm font-medium text-text">{user.name}</span>}
      </button>
    </Dropdown>
  )
}
