import React, { Fragment, useState, useMemo } from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import cls from 'classnames';
import { Menu, MenuItem } from '@mui/material';
import { useI18n } from '@milesight/shared/src/hooks';
import Handle from '../handle';
import { basicNodeConfigs } from '../../constant';
import './style.less';

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
    nodeProps,
    handles = [
        <Handle type="target" position={Position.Left} nodeProps={nodeProps} />,
        <Handle type="source" position={Position.Right} nodeProps={nodeProps} />,
    ],
    children,
}) => {
    const { getIntlText } = useI18n();
    const status = nodeProps?.data?.$status;

    // ---------- 右键菜单 ----------
    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>();
    const isEntryNode = basicNodeConfigs[nodeProps.type as WorkflowNodeType]?.category === 'entry';

    /**
     * 「变更节点」子菜单
     */
    const nodeMenus = useMemo(() => {
        const result = Object.values(basicNodeConfigs).filter(item => {
            return item.category === 'entry' && item.type !== nodeProps.type;
        });

        return result;
    }, [nodeProps]);

    /**
     * 右键菜单点击回调
     */
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

    /**
     * 菜单项点击回调
     */
    const handleMenuItemClick = (
        type: 'change' | 'delete',
        record: NodeProps,
        targetNodeType?: WorkflowNodeType,
    ) => {
        console.log({ type, record, targetNodeType });

        setAnchorEl(null);
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
                    className="ms-workflow-node-menu"
                    open={contextMenu !== null}
                    onClose={() => setContextMenu(null)}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                            : undefined
                    }
                >
                    {isEntryNode && (
                        <MenuItem
                            onClick={e => {
                                setAnchorEl(e.currentTarget);
                            }}
                        >
                            {getIntlText('workflow.context_menu.title_change_node')}
                        </MenuItem>
                    )}
                    <MenuItem onClick={() => handleMenuItemClick('delete', nodeProps)}>
                        {getIntlText('common.label.delete')}
                    </MenuItem>
                </Menu>
                <Menu
                    className="ms-workflow-node-contextmenu"
                    open={!!anchorEl}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    onClose={() => setAnchorEl(null)}
                >
                    {nodeMenus.map(node => (
                        <MenuItem
                            key={node.type}
                            onClick={() => handleMenuItemClick('change', nodeProps, node.type)}
                        >
                            <span className="icon" style={{ backgroundColor: node.iconBgColor }}>
                                {node.icon}
                            </span>
                            <span className="title">{getIntlText(node.labelIntlKey)}</span>
                        </MenuItem>
                    ))}
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
