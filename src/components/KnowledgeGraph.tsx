"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef } from "react";
import { Network } from "vis-network";

export default function KnowledgeGraph({ graphData, onNodeClick }: { graphData: any, onNodeClick: (node: any) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<any>(null);
  // React ref to hold the latest onNodeClick to prevent unneeded useEffect triggers
  const onNodeClickRef = useRef(onNodeClick);

  useEffect(() => {
    onNodeClickRef.current = onNodeClick;
  }, [onNodeClick]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Transform data
    const nodes = graphData.nodes.map((n: any) => {
      let bg = "#8b949e", border = "#8b949e", fontColor = "rgba(255,255,255,0.6)";
      let shadowSize = 10;
      
      if (n.group === 1) {
        bg = "#FF6B4A"; border = "#FF6B4A"; fontColor = "rgba(255,255,255,0.9)"; shadowSize = 25;
      } else if (n.group === 2) {
        bg = "#3b82f6"; border = "#3b82f6"; fontColor = "rgba(255,255,255,0.8)"; shadowSize = 15;
      } else if (n.group === 3) {
        bg = "#ffffff"; border = "#ffffff"; fontColor = "rgba(255,255,255,0.9)"; shadowSize = 15;
      }

      return {
        id: n.id,
        label: n.id,
        value: n.val,
        group: n.group,
        color: {
          background: bg,
          border: border,
          highlight: { background: "#ffffff", border: "#ffffff" },
          hover: { background: bg, border: "#ffffff" }
        },
        font: {
          color: fontColor,
          face: "Inter, sans-serif",
          size: n.group === 1 ? 16 : 12,
          vadjust: n.val ? Math.sqrt(n.val) * -2 - 10 : -20,
          strokeWidth: 0,
        },
        shape: "dot",
        shadow: {
          enabled: true,
          color: bg,
          size: shadowSize,
          x: 0,
          y: 0
        }
      };
    });

    const edges = graphData.links.map((l: any) => ({
      from: l.source,
      to: l.target,
      label: l.label,
      font: {
        color: "rgba(255,255,255,0.3)",
        size: 10,
        face: "Inter, sans-serif",
        strokeWidth: 0,
        align: "horizontal"
      },
      color: {
        color: "rgba(255,255,255,0.15)",
        highlight: "rgba(255,107,74,0.8)",
        hover: "rgba(255,255,255,0.3)"
      },
      arrows: {
        to: { enabled: true, scaleFactor: 0.5, type: "arrow" }
      },
      smooth: {
        type: "continuous",
        roundness: 0.5
      }
    }));

    const options = {
      nodes: {
        scaling: { min: 10, max: 40 },
        borderWidth: 2,
        borderWidthSelected: 4,
      },
      edges: {
        width: 1.5,
        selectionWidth: 3,
        hoverWidth: 2,
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -120,
          centralGravity: 0.005,
          springLength: 200,
          springConstant: 0.04,
          damping: 0.09
        },
        maxVelocity: 50,
        solver: "forceAtlas2Based",
        timestep: 0.35,
        stabilization: {
          enabled: true,
          iterations: 150,
          updateInterval: 25
        }
      },
      interaction: {
        hover: true,
        tooltipDelay: 200,
        zoomView: true,
        dragView: true,
      }
    };

    networkRef.current = new Network(containerRef.current, { nodes, edges }, options);

    networkRef.current.on("click", function (params: any) {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const nodeData = graphData.nodes.find((n: any) => n.id === nodeId);
        if (nodeData) {
          onNodeClickRef.current(nodeData);
          // Subtle, smoother zoom to avoid jumping (Scale changed from 1.3 to 1.05)
          networkRef.current.focus(nodeId, {
            scale: 1.05,
            animation: {
              duration: 1000,
              easingFunction: "easeInOutQuart" // Even smoother easing
            }
          });
        }
      } else {
        onNodeClickRef.current(null);
      }
    });

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
      }
    };
  // ONLY depend on graphData. Removing onNodeClick prevents network destruction on click!
  }, [graphData]);

  return <div ref={containerRef} className="w-full h-full bg-[#0D1117] cursor-grab active:cursor-grabbing outline-none" />;
}
