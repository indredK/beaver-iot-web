import React from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import cls from 'classnames';
import { useI18n } from '@milesight/shared/src/hooks';
import { FlagIcon } from '@milesight/shared/src/components';
import './style.less';

export type EndNode = Node<EndNodeDataType, 'end'>;

/**
 * 结束节点
 */
const EndNode: React.FC<NodeProps<EndNode>> = ({ data }) => {
    const { getIntlText } = useI18n();
    console.log(data);

    return (
        <>
            <Handle type="target" position={Position.Left} />
            <div
                className={cls('ms-workflow-node ms-workflow-node-end', {
                    error: data.$status === 'error',
                    success: data.$status === 'success',
                })}
            >
                <div className="ms-workflow-node-header">
                    <span className="ms-workflow-node-icon">
                        <FlagIcon sx={{ fontSize: 16 }} />
                    </span>
                    <span className="ms-workflow-node-title">
                        {getIntlText('workflow.label.end_node_name')}
                    </span>
                </div>
            </div>
        </>
    );
};

export default React.memo(EndNode);
