import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import { Tooltip } from '@/components/atoms'
import { selectThemeMode, toggleThemeMode, useAppDispatch, useAppSelector } from '@/store'

/** Molecule: nút chuyển giao diện sáng / tối (lưu trong Redux + localStorage). */
export function ThemeToggle() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const mode = useAppSelector(selectThemeMode)
  const label = mode === 'dark' ? t('theme.light') : t('theme.dark')

  return (
    <Tooltip title={label}>
      <IconButton aria-label={label} onClick={() => dispatch(toggleThemeMode())}>
        {mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  )
}
