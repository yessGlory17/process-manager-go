import { useEffect, useState } from "react";
import { goProcessResult } from "../../api/types";
import { Box, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function Table() {
  const [processes, setProcesses] = useState<goProcessResult["Result"]>([]);

  useEffect(() => {
    const get = async () => {
      const b = await window?.goProcess();
      console.log("TYPE: ", Object.keys(b));
      console.log("DATA: ", b["Result"]);
      setProcesses(b.Result);
    };
    setInterval(() => {
      get();
    }, 1000);
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {/* {processes} */}
      <DataGrid
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

export default Table;
