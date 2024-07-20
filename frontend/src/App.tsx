import { Box, Grid } from '@mui/material'
import ProcessTable from './components/ProcessTable'

function App() {

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Box width="100%" height="50px" border="1px solid red"></Box>
      </Grid>
      <ProcessTable />
    </Grid>
  )
}

export default App
