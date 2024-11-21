import { useState, useCallback } from 'react';
import {
    ReactFlow,
    // Controls,
    Background,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    type ReactFlowProps,
} from '@xyflow/react';
import { useTheme } from '@milesight/shared/src/hooks';
import { MIN_ZOOM, MAX_ZOOM } from './constant';
import { useNodeTypes } from './hooks';
import { Topbar, Controls, ConfigPanel, Edge } from './components';

import '@xyflow/react/dist/style.css';
import './style.less';

const edgeTypes = {
    'custom-edge': Edge,
};

const initialNodes = [
    {
        id: '1',
        data: { label: 'Hello' },
        position: { x: 0, y: 0 },
        type: 'input',
    },
    {
        id: '2',
        data: { label: 'World' },
        position: { x: 300, y: 100 },
        type: 'ifelse',
    },
    {
        id: '3',
        data: { label: 'End ABC' },
        position: { x: 600, y: 0 },
        type: 'end',
    },
];

const initialEdges = [
    { id: '1-2', source: '1', target: '2', type: 'custom-edge' },
    { id: '2-3', source: '2', target: '3' },
];

/**
 * 工作流编辑器
 */
const WorkflowEditor = () => {
    const { grey } = useTheme();
    const nodeTypes = useNodeTypes();
    const [nodes, setNodes] = useState<ReactFlowProps['nodes']>(initialNodes);
    const [edges, setEdges] = useState<ReactFlowProps['edges']>(initialEdges);

    const onNodesChange = useCallback<NonNullable<ReactFlowProps['onNodesChange']>>(
        changes => setNodes(nds => applyNodeChanges(changes, nds!)),
        [],
    );
    const onEdgesChange = useCallback<NonNullable<ReactFlowProps['onEdgesChange']>>(
        changes => setEdges(eds => applyEdgeChanges(changes, eds!)),
        [],
    );

    const onConnect = useCallback<NonNullable<ReactFlowProps['onConnect']>>(
        params => setEdges(eds => addEdge(params, eds!)),
        [],
    );

    return (
        <div className="ms-main">
            <Topbar />
            <div className="ms-view ms-view-wf_editor">
                <div className="ms-view__inner">
                    <ReactFlow
                        fitView
                        className="ms-workflow"
                        minZoom={MIN_ZOOM}
                        maxZoom={MAX_ZOOM}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                    >
                        <Background style={{ backgroundColor: grey['100'] }} />
                        <Controls minZoom={MIN_ZOOM} maxZoom={MAX_ZOOM} />
                        <ConfigPanel />
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
};

export default WorkflowEditor;
