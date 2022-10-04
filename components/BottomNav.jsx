import { Home } from '@mui/icons-material'
import { Button, Container } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

export default function BottomNav() {
  return (
      <Container maxWidth="sx" >
          <Stack direction="row">
              <Button size='small' startIcon={<Home/>}></Button>
          </Stack>
   </Container>
  )
}
