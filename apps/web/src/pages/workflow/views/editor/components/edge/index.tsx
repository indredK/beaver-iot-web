import React, { useCallback } from 'react';
import {
    BaseEdge,
    EdgeLabelRenderer,
    getBezierPath,
    useEdges,
    type EdgeProps,
} from '@xyflow/react';
import NodeMenu from '../node-menu';
import './style.less';

/**
 * 自定义连线组件
 */
const AddableEdge = ({
    id,
    data,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    selected,
    style = {},
    markerEnd,
}: EdgeProps<WorkflowEdge>) => {
    const edges = useEdges<WorkflowEdge>();
    const edge = edges.find(edge => edge.id === id);
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            {(selected || data?.$hovering) && (
                <EdgeLabelRenderer>
                    <div
                        className="ms-workflow-edge-label"
                        style={{
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        }}
                    >
                        <NodeMenu edge={edge} />
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
};

export default React.memo(AddableEdge);
