// @ts-nocheck
import { Paper, styled } from "@mui/material";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo } from "react";
import { Process } from "../../api/types";
import { stratify, tree } from "d3-hierarchy";
import _ from "lodash";

const StyledControls = styled(Controls)({
  "& .react-flow__controls-button": {
    backgroundColor: "#1F2937",
    border: "1px solid #939AA6",
    "& > svg": {
      fill: "#939AA6",
    },
  },
});

const g = tree();

type TreeProps = {
  process: Process;
};

const getLayoutedElements = (nodes, edges, options) => {
  if (nodes.length === 0) return { nodes, edges };

  const width = 80;
  const height = 40;
  const _nodes = _.uniqBy(nodes, "id");
  console.log("NODES:", nodes);
  const hierarchy = stratify()
    .id((node) => node.id)
    .parentId((node) => edges.find((edge) => edge.target === node.id)?.source);
  console.log("Hiyerarsi hesaplandi!", hierarchy);
  const root = hierarchy(_nodes);
  console.log("ROOT BELIRLENDI: ", root);
  const layout = g.nodeSize([width * 2, height * 2])(root);

  return {
    nodes: layout
      .descendants()
      .map((node) => ({ ...node.data, position: { x: node.x, y: node.y } })),
    edges,
  };
};

const prepareNodes = (process: Process) => {
  const _childs = _.uniqBy(process.childrens, "pid");

  const root = {
    id: process.pid.toString(),
    position: { x: 0, y: 0 },
    data: { label: process.exe },
    style: { backgroundColor: "rgba(17, 184,134, 0.2)", color: "#FFF" },
  };

  return [
    root,
    ..._childs?.map((process, index) => ({
      id: process.pid.toString(),
      position: { x: 0, y: index * 100 },
      data: { label: process.exe },
      style: {
        backgroundColor: "rgba(105, 80, 232, 0.2)",
        color: "#FFF",
      },
    })),
  ];
};

const prepareEdges = (process: Process) => {
  const _childs = _.uniqBy(process.childrens, "pid");
  return _childs.map((children) => ({
    id: `edge-${children.pid}`,
    target: children.pid.toString(),
    source: process.pid.toString(),
  }));
};

function Tree({ process }: TreeProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(prepareNodes(process));
  const [edges, setEdges, onEdgesChange] = useEdgesState(prepareEdges(process));
  const { fitView } = useReactFlow();

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, {
          direction,
        });

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);

      window.requestAnimationFrame(() => {
        fitView();
      });
    },
    [nodes, edges]
  );

  useEffect(() => {
    if (nodes.length > 0 && edges.length > 0) {
      console.log("Layout yukleniyor...");
      onLayout();
    }
  }, []);

  return (
    <Paper sx={{ width: "100%", height: "700px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        colorMode="light"
      >
        <StyledControls />
        <MiniMap bgColor="transparent" />
        <Background gap={12} size={1} />
      </ReactFlow>
    </Paper>
  );
}

export default Tree;
