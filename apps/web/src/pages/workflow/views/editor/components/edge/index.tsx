import React, { useCallback } from 'react';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from '@xyflow/react';
import { AddCircleIcon } from '@milesight/shared/src/components';
import './style.less';

/**
 * 自定义连线组件
 */
const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    selected,
    style = {},
    markerEnd,
}: EdgeProps) => {
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    // const onEdgeClick = () => {
    //     console.log(`Edge with id: ${id} has been clicked!`);
    // };
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        console.log('popup the nodes menu...');
    }, []);

    return (
        <>
            <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
            {selected && (
                <EdgeLabelRenderer>
                    <div
                        className="ms-workflow-edge-label"
                        style={{
                            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        }}
                        onClick={handleClick}
                    >
                        <AddCircleIcon />
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
};

export default React.memo(CustomEdge);
