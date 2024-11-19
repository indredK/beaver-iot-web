import React from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import cls from 'classnames';
import { useI18n } from '@milesight/shared/src/hooks';
import { InputIcon } from '@milesight/shared/src/components';
import './style.less';

export type InputNode = Node<InputNodeDataType, 'input'>;

/**
 * 输入节点
 */
const InputNode: React.FC<NodeProps<InputNode>> = ({ data }) => {
    const { getIntlText } = useI18n();
    console.log(data);

    return (
        <>
            <div
                className={cls('ms-workflow-node ms-workflow-node-input', {
                    error: data.$status === 'error',
                    success: data.$status === 'success',
                })}
            >
                <div className="ms-workflow-node-header">
                    <span className="ms-workflow-node-icon">
                        <InputIcon sx={{ fontSize: 16 }} />
                    </span>
                    <span className="ms-workflow-node-title">
                        {getIntlText('workflow.label.input_node_name')}
                    </span>
                </div>
            </div>
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default React.memo(InputNode);
