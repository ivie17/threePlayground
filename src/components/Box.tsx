import { Box as MuiBox, BoxProps } from '@mui/material'

export default function Box({
  component,
  ...props
}: Omit<BoxProps, 'component'> & { component?: 'div' | 'span' }) {
  return <MuiBox component={component ?? 'div'} {...props} />
}
