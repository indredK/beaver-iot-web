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
import { Topbar, Controls, ConfigPanel, InputNode, EndNode, IfElseNode } from './components';

import '@xyflow/react/dist/style.css';
import './style.less';

const nodeTypes: Record<WorkflowNodeType, any> = {
    input: InputNode,
    end: EndNode,
    code: () => <>code</>,
    ifelse: IfElseNode,
    assigner: () => <>assigner</>,
    timer: () => <>timer</>,
    event: () => <>event</>,
    service: () => <>service</>,
    email: () => <>email</>,
    webhook: () => <>webhook</>,
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
];

const initialEdges = [{ id: '1-2', source: '1', target: '2' }];

/**
 * 工作流编辑器
 */
const WorkflowEditor = () => {
    const { grey } = useTheme();
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
