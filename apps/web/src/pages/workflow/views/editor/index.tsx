import { useState, useCallback } from 'react';
import {
    ReactFlow,
    Background,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    type ReactFlowProps,
    type Node,
    type NodeChange,
} from '@xyflow/react';
import { useTheme } from '@milesight/shared/src/hooks';
import { MIN_ZOOM, MAX_ZOOM } from './constant';
import { useNodeTypes } from './hooks';
import { Topbar, Controls, ConfigPanel, Edge, HelperLines } from './components';
import { getHelperLines } from './utils';

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
        type: 'trigger',
    },
    {
        id: '2',
        data: { label: 'World', $status: 'error' },
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
    { id: '2-3', source: '2', target: '3', type: 'custom-edge' },
];

/**
 * 工作流编辑器
 */
const WorkflowEditor = () => {
    const { grey } = useTheme();
    const nodeTypes = useNodeTypes();
    const [nodes, setNodes] = useState<ReactFlowProps['nodes']>(initialNodes);
    const [edges, setEdges] = useState<ReactFlowProps['edges']>(initialEdges);

    const [helperLineHorizontal, setHelperLineHorizontal] = useState<number | undefined>(undefined);
    const [helperLineVertical, setHelperLineVertical] = useState<number | undefined>(undefined);

    const customApplyNodeChanges = useCallback((changes: NodeChange[], nodes: Node[]): Node[] => {
        // reset the helper lines (clear existing lines, if any)
        setHelperLineHorizontal(undefined);
        setHelperLineVertical(undefined);

        // this will be true if it's a single node being dragged
        // inside we calculate the helper lines and snap position for the position where the node is being moved to
        if (
            changes.length === 1 &&
            changes[0].type === 'position' &&
            changes[0].dragging &&
            changes[0].position
        ) {
            const helperLines = getHelperLines(changes[0], nodes);

            // if we have a helper line, we snap the node to the helper line position
            // this is being done by manipulating the node position inside the change object
            changes[0].position.x = helperLines.snapPosition.x ?? changes[0].position.x;
            changes[0].position.y = helperLines.snapPosition.y ?? changes[0].position.y;

            // if helper lines are returned, we set them so that they can be displayed
            setHelperLineHorizontal(helperLines.horizontal);
            setHelperLineVertical(helperLines.vertical);
        }

        return applyNodeChanges(changes, nodes);
    }, []);

    const onNodesChange = useCallback<NonNullable<ReactFlowProps['onNodesChange']>>(
        changes => setNodes(nds => customApplyNodeChanges(changes, nds!)),
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
                        <HelperLines
                            horizontal={helperLineHorizontal}
                            vertical={helperLineVertical}
                        />
                        <ConfigPanel />
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
};

export default WorkflowEditor;
