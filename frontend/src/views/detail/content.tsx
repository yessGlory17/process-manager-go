import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { GoCpu } from "react-icons/go";
import { GrMemory } from "react-icons/gr";
import { VscServerProcess } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import { Process } from "../../api/types";

function Content() {
  const [process, setProcess] = useState<Process | null>(null);
  const { pid } = useParams();

  useEffect(() => {
    const get = async () => {
      const process = await window.processDetail(Number(pid));
      console.log("BULUNAN PROCESSES: ", process);
      setProcess(process.Result);
    };
    get();
  }, [pid]);

  return (
    <Grid container direction="column" p={3} spacing={3}>
      <Grid container item xs={12} justifyContent="space-evenly" spacing={1}>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justifyContent="flex-start"
          component={Paper}
          p={4}
        >
          <Grid container item xs={12} justifyContent="space-between" ml={2} mt={2}>
            <Grid item xs={3}>
              <Typography m={1} variant="h5" color="text.primary">
                General Info
              </Typography>
            </Grid>
            <Grid item xs={3}>
                {/* <Typography>Actions</Typography> */}
            </Grid>
          </Grid>
          <Grid container item xs={12} justifyContent="space-between" ml={2}>
            <Grid item xs={3} justifyContent="flex-start">
              <Box display="flex" flexDirection="row" alignItems="flex-start">
                <Box
                  width={64}
                  height={64}
                  padding={2}
                  bgcolor="rgba(17, 184,134, 0.2)"
                  borderRadius={4}
                >
                  <VscServerProcess size={32} color="#11B886" />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography variant="subtitle1" ml={2} color="text.secondary">
                    Process
                  </Typography>
                  <Typography
                    ml={2}
                    variant="h6"
                    textAlign="left"
                    color="text.primary"
                  >
                    {process && process?.exe.toUpperCase()}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={3} justifyContent="flex-start">
              <Box display="flex" flexDirection="row" alignItems="flex-start">
                <Box
                  width={64}
                  height={64}
                  padding={2}
                  bgcolor="rgba(17, 184,134, 0.2)"
                  borderRadius={4}
                >
                  <FaRegUser size={32} color="#11B886" />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography variant="subtitle1" ml={2} color="text.secondary">
                    User
                  </Typography>
                  <Typography
                    ml={2}
                    variant="h6"
                    textAlign="left"
                    color="text.primary"
                  >
                    {process && process?.username.toUpperCase()}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={3} justifyContent="flex-start">
              <Box display="flex" flexDirection="row" alignItems="flex-start">
                <Box
                  width={64}
                  height={64}
                  padding={2}
                  bgcolor="rgba(17, 184,134, 0.2)"
                  borderRadius={4}
                >
                  <GoCpu size={32} color="#11B886" />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography variant="subtitle1" ml={2} color="text.secondary">
                    Last Cpu Usage
                  </Typography>
                  <Typography
                    ml={2}
                    variant="h6"
                    textAlign="left"
                    color="text.primary"
                  >
                    %{process && process?.cpu.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={3} justifyContent="flex-start">
              <Box display="flex" flexDirection="row" alignItems="flex-start">
                <Box
                  width={64}
                  height={64}
                  padding={2}
                  bgcolor="rgba(17, 184,134, 0.2)"
                  borderRadius={4}
                >
                  <GrMemory size={32} color="#11B886" />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography variant="subtitle1" ml={2} color="text.secondary">
                    Last Memory Usage
                  </Typography>
                  <Typography
                    ml={2}
                    variant="h6"
                    textAlign="left"
                    color="text.primary"
                  >
                    %{process && process?.memory.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid
          container
          item
          xs={1}
          lg={2}
          alignItems="center"
          justifyContent="flex-start"
          component={Paper}
          p={4}
        >
          <Button variant="contained">Actions</Button>
        </Grid> */}
      </Grid>
      <Grid container item xs={12}>
        <Paper sx={{ width: "100%", height: "500px" }} />
      </Grid>
    </Grid>
  );
}

export default Content;
