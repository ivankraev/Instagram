import { ForwardedRef, forwardRef } from 'react'

import { Button } from '@mui/material'

type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function FileButton({ onChange }: Props, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <>
      <Button
        disableRipple
        fullWidth
        variant="outlined"
        onClick={() => (ref as React.MutableRefObject<HTMLInputElement>)?.current?.click()}>
        Upload file
      </Button>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        ref={ref}
        style={{ display: 'none' }}
      />
    </>
  )
}

export default forwardRef<HTMLInputElement, Props>(FileButton)
