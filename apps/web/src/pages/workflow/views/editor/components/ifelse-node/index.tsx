import React from 'react';
import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import cls from 'classnames';
import { useI18n } from '@milesight/shared/src/hooks';
import { CallSplitIcon } from '@milesight/shared/src/components';
import './style.less';

export type IfElseNode = Node<InputNodeDataType, 'ifelse'>;

/**
 * 输入节点
 */
const IfElseNode: React.FC<NodeProps<IfElseNode>> = ({ data }) => {
    const { getIntlText } = useI18n();
    console.log(data);

    return (
        <>
            <Handle type="target" position={Position.Left} />
            <div
                className={cls('ms-workflow-node ms-workflow-node-ifelse', {
                    error: data.$status === 'error',
                    success: data.$status === 'success',
                })}
            >
                <div className="ms-workflow-node-header">
                    <span className="ms-workflow-node-icon">
                        <CallSplitIcon sx={{ fontSize: 16, transform: 'rotate(90deg)' }} />
                    </span>
                    <span className="ms-workflow-node-title">
                        {getIntlText('workflow.label.ifelse_node_name')}
                    </span>
                </div>
                {/* TODO: render conditions detail... */}
                {/* <div className="ms-workflow-node-body">
                    <div className="ms-workflow-node-body__item">
                        <span className="ms-workflow-node-body__label">输入属性 Key</span>
                        <span className="ms-workflow-node-body__value">输入属性 Value</span>
                    </div>
                </div> */}
            </div>
            <Handle type="source" position={Position.Right} />
        </>
    );
};

export default React.memo(IfElseNode);
