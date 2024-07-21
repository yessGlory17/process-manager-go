import { useEffect, useState } from "react";
import { goProcessResult } from "../../api/types";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

function Table() {
  const [processes, setProcesses] = useState<goProcessResult["Result"]>([]);

  useEffect(() => {
    const get = async () => {
      const b = await window?.goProcess();
      // console.log("TYPE: ", Object.keys(b));
      // console.log("DATA: ", b["Result"]);
      setProcesses(b.Result);
    };
    setInterval(() => {
      get();
    }, 1000);
  }, []);

  return (
    <Paper sx={{ width: "calc(100%-16px)", height: "calc(100%-16px)", margin: 2, padding:4 }}>
      <DataGrid
        sx={{
          border: "none",
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          '& .MuiDataGrid-columnHeader':{
            border:"none",
            backgroundColor:"#1F2937"
          },
        }}
        rowSelection={false}
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
                style={{ textDecoration: "none", color:"#11B886" }}
                to={`/process/detail/${row.pid}`}
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
    </Paper>
  );
}

export default Table;
