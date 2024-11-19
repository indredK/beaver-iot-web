import React from 'react';
import { Handle, Position } from '@xyflow/react';
import cls from 'classnames';
import { useI18n } from '@milesight/shared/src/hooks';

export type NodeContainerProps = {
    /**
     * 节点 Title 的国际化文案 Key
     */
    titleIntlKey: string;

    /**
     * 节点 Icon
     */
    icon: React.ReactNode;

    /**
     * 节点 Icon 背景色
     */
    iconBgColor: string;

    /**
     * 节点操作柄集合，默认会有左右操作柄
     */
    handles?: React.ReactNode[];

    /**
     * 节点类型
     */
    type: WorkflowNodeType;

    /**
     * 节点状态
     */
    status?: BaseNodeDataType['$status'];

    /**
     * 节点详情内容
     */
    children?: React.ReactNode;
};

/**
 * 通用节点容器
 */
const NodeContainer: React.FC<NodeContainerProps> = ({
    titleIntlKey,
    icon,
    iconBgColor,
    handles = [
        <Handle type="target" position={Position.Left} />,
        <Handle type="source" position={Position.Right} />,
    ],
    status,
    children,
}) => {
    const { getIntlText } = useI18n();

    return (
        <>
            {handles?.map(handle => handle)}
            <div
                className={cls('ms-workflow-node', {
                    error: status === 'error',
                    success: status === 'success',
                })}
            >
                <div className="ms-workflow-node-header">
                    <span
                        className="ms-workflow-node-icon"
                        style={{ backgroundColor: iconBgColor }}
                    >
                        {icon}
                    </span>
                    <span className="ms-workflow-node-title">{getIntlText(titleIntlKey)}</span>
                </div>
                {children && <div className="ms-workflow-node-body">{children}</div>}
            </div>
        </>
    );
};

export default NodeContainer;
