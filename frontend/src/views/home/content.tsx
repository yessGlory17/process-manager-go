import { Box, Grid } from "@mui/material";
import ProcessTable from "../../components/ProcessTable";

function Content() {
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Box width="100%" height="50px" ></Box>
      </Grid>
      <ProcessTable />
    </Grid>
  );
}

export default Content;
