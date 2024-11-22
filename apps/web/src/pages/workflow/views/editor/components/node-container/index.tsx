import React, { useState, Fragment } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import cls from 'classnames';
import { Menu, MenuItem } from '@mui/material';
import { useI18n } from '@milesight/shared/src/hooks';

export type NodeContainerProps = {
    /**
     * 节点类型
     */
    type: WorkflowNodeType;

    /**
     * 节点 Title 的国际化文案 Key
     */
    title: string;

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
     * 节点所有属性
     */
    nodeProps: NodeProps;

    /**
     * 节点详情内容
     */
    children?: React.ReactNode;
};

/**
 * 通用节点容器
 */
const NodeContainer: React.FC<NodeContainerProps> = ({
    type,
    title,
    icon,
    iconBgColor,
    handles = [
        <Handle type="target" position={Position.Left} />,
        <Handle type="source" position={Position.Right} />,
    ],
    nodeProps,
    children,
}) => {
    const { getIntlText } = useI18n();
    const status = nodeProps?.data?.$status;

    // ---------- 右键菜单 ----------
    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                      mouseX: event.clientX + 2,
                      mouseY: event.clientY - 6,
                  }
                : null,
        );
    };

    const handleMenuItemClick = (
        type: 'change' | 'delete',
        record: NodeProps,
        targetNodeType?: WorkflowNodeType,
    ) => {
        console.log({ type, record, targetNodeType });
        setContextMenu(null);
    };

    return (
        <>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {handles?.map((handle, index) => <Fragment key={index}>{handle}</Fragment>)}
            <div
                className={cls('ms-workflow-node', `ms-workflow-node-${type}`, {
                    error: status === 'error',
                    success: status === 'success',
                })}
                onContextMenu={handleContextMenu}
            >
                <Menu
                    open={contextMenu !== null}
                    onClose={() => setContextMenu(null)}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                            : undefined
                    }
                >
                    <MenuItem onClick={() => handleMenuItemClick('change', nodeProps, 'timer')}>
                        {getIntlText('workflow.context_menu.title_change_node')}
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuItemClick('delete', nodeProps)}>
                        {getIntlText('common.label.delete')}
                    </MenuItem>
                </Menu>
                <div className="ms-workflow-node-header">
                    <span
                        className="ms-workflow-node-icon"
                        style={{ backgroundColor: iconBgColor }}
                    >
                        {icon}
                    </span>
                    <span className="ms-workflow-node-title">{title}</span>
                </div>
                {children && <div className="ms-workflow-node-body">{children}</div>}
            </div>
        </>
    );
};

export default NodeContainer;
