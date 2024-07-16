import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Grid, Link } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    const a = async () => {
      const b = await window.goProcess();
      console.log("TYPE: ", Object.keys(b));
      console.log("DATA: ", b["Result"]);

      setProcesses(b["Result"]);
    };
    setInterval(() => {
      a();
    }, [1000]);
  }, []);

  useEffect(() => {
    if (processes.length > 0) {
      console.log("LAST: ", processes);
    }
  }, [processes]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <DataGrid
        isCellEditable={false}
        rows={processes.map((p, i) => ({ id: i, ...p }))}
        columns={[
          {
            field: "pid",
            headerName: "Pid",
            flex: 1,
            minWidth: 200,
          },
          {
            field: "username",
            headerName: "Username",
            flex: 1,
            minWidth: 200,
          },
          {
            field: "exe",
            headerName: "Exe",
            flex: 1,
            minWidth: 500,
            renderCell: ({ value, row }) => (
              <Link
                sx={{ textDecoration: "none" }}
                href={`/process/detail/${row.id}`}
              >
                {value}
              </Link>
            ),
          },
          {
            field: "memory",
            headerName: "Memory",
            minWidth: 200,
            flex: 1,
          },
          {
            field: "cpu",
            headerName: "Cpu",
            minWidth: 200,
            flex: 1,
          },
        ]}
      />
    </Box>
  );
}

export default App;
