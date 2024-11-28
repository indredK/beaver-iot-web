import { memo, useState, useCallback } from 'react';
import {
    ReactFlow,
    Background,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    SelectionMode,
    useReactFlow,
    getOutgoers,
    ReactFlowProvider,
    type ReactFlowProps,
    type Node,
    type NodeChange,
} from '@xyflow/react';
import { useTheme } from '@milesight/shared/src/hooks';
import { MIN_ZOOM, MAX_ZOOM } from './constant';
import { useNodeTypes } from './hooks';
import { Topbar, Controls, ConfigPanel, Edge, HelperLines, getHelperLines } from './components';
import demoData from './demo-data.json';

import '@xyflow/react/dist/style.css';
import './style.less';

const edgeTypes: Record<WorkflowEdgeType, React.FC<any>> = {
    addable: Edge,
};

type RFProps = ReactFlowProps<WorkflowNode, WorkflowEdge>;

/**
 * 工作流编辑器
 */
const WorkflowEditor = () => {
    const { grey } = useTheme();
    const nodeTypes = useNodeTypes();
    const [nodes, setNodes] = useState<WorkflowNode[]>(demoData.nodes as WorkflowNode[]);
    const [edges, setEdges] = useState<WorkflowEdge[]>(demoData.edges as WorkflowEdge[]);

    const [helperLineHorizontal, setHelperLineHorizontal] = useState<number | undefined>(undefined);
    const [helperLineVertical, setHelperLineVertical] = useState<number | undefined>(undefined);

    const customApplyNodeChanges = useCallback(
        (changes: NodeChange<WorkflowNode>[], nodes: WorkflowNode[]): WorkflowNode[] => {
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
        },
        [],
    );

    const onNodesChange = useCallback<NonNullable<RFProps['onNodesChange']>>(
        changes => setNodes(nds => customApplyNodeChanges(changes, nds!)),
        [],
    );
    const onEdgesChange = useCallback<NonNullable<RFProps['onEdgesChange']>>(
        changes => setEdges(eds => applyEdgeChanges(changes, eds!)),
        [],
    );

    const onConnect = useCallback<NonNullable<RFProps['onConnect']>>(
        connection => setEdges(eds => addEdge({ ...connection, type: 'addable' }, eds!)),
        [],
    );

    const { getNodes, getEdges } = useReactFlow();
    const isValidConnection = useCallback<NonNullable<RFProps['isValidConnection']>>(
        connection => {
            // we are using getNodes and getEdges helpers here
            // to make sure we create isValidConnection function only once
            const nodes = getNodes();
            const edges = getEdges();
            const target = nodes.find(node => node.id === connection.target);
            const hasCycle = (node: Node, visited = new Set()) => {
                if (visited.has(node.id)) return false;

                visited.add(node.id);

                for (const outgoer of getOutgoers(node, nodes, edges)) {
                    if (outgoer.id === connection.source) return true;
                    if (hasCycle(outgoer, visited)) return true;
                }
            };

            if (target?.id === connection.source) return false;
            return !hasCycle(target!);
        },
        [getNodes, getEdges],
    );

    return (
        <div className="ms-main">
            <Topbar />
            <div className="ms-view ms-view-wf_editor">
                <div className="ms-view__inner">
                    <ReactFlow<WorkflowNode, WorkflowEdge>
                        fitView
                        className="ms-workflow"
                        minZoom={MIN_ZOOM}
                        maxZoom={MAX_ZOOM}
                        selectionOnDrag={false}
                        selectNodesOnDrag={false}
                        selectionKeyCode={null}
                        multiSelectionKeyCode={null}
                        selectionMode={SelectionMode.Partial}
                        isValidConnection={isValidConnection}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        nodes={nodes}
                        edges={edges}
                        // TODO: 优化，抽离到 useNodeInteractions 中
                        onBeforeDelete={async ({ nodes }) => {
                            const hasEntryNode = nodes.some(
                                node =>
                                    node.type === 'trigger' ||
                                    node.type === 'timer' ||
                                    node.type === 'listener',
                            );

                            if (hasEntryNode) return false;
                            return true;
                        }}
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

export default memo(() => (
    <ReactFlowProvider>
        <WorkflowEditor />
    </ReactFlowProvider>
));
