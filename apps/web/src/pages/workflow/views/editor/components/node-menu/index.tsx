import { useState } from 'react';
import { type HandleType } from '@xyflow/react';
import { Menu, MenuItem, type MenuProps } from '@mui/material';
import { AddCircleIcon } from '@milesight/shared/src/components';

interface Props extends Omit<MenuProps, 'open' | 'anchorEl' | 'onClose' | 'children'> {
    /**
     * 节点信息
     */
    node?: WorkflowNode;

    /**
     * 操作柄类型
     */
    handleType?: HandleType;

    /**
     * 子元素
     */
    children?: React.ReactNode;
}

/**
 * 节点菜单
 */
const NodeMenu = ({ node, handleType = 'source', children, ...menuProps }: Props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

    return (
        <div className="ms-workflow-node-menu-popover-root">
            <div onClick={e => setAnchorEl(e.currentTarget)}>{children || <AddCircleIcon />}</div>
            <Menu
                className="ms-workflow-node-menu-popover"
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                {...menuProps}
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem>IF/ELSE</MenuItem>
                <MenuItem>IF/ELSE</MenuItem>
            </Menu>
        </div>
    );
};

export default NodeMenu;
