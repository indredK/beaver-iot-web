import { useState, useMemo, useEffect } from 'react';
import { type HandleType } from '@xyflow/react';
import { Menu, MenuItem, Stack, type MenuProps } from '@mui/material';
import { useI18n } from '@milesight/shared/src/hooks';
import { AddCircleIcon } from '@milesight/shared/src/components';
import { nodeCategoryConfigs, basicNodeConfigs, type NodeConfigItemType } from '../../constant';
import './style.less';

interface Props extends Omit<MenuProps, 'open' | 'anchorEl' | 'onClose' | 'children' | 'onChange'> {
    /**
     * 节点信息
     */
    node?: WorkflowNode;

    /**
     * 边信息
     */
    edge?: WorkflowEdge;

    /**
     * 操作柄类型
     */
    handleType?: HandleType;

    /**
     * 子元素
     */
    children?: React.ReactNode;

    /**
     * 打开状态变更回调
     */
    onChange?: (open: boolean) => void;
}

/**
 * 节点菜单
 */
const NodeMenu = ({ node, handleType = 'source', children, onChange, ...menuProps }: Props) => {
    const { getIntlText } = useI18n();
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const menuOptions = useMemo(() => {
        const result: Partial<
            Record<
                WorkflowNodeCategoryType,
                (NodeConfigItemType & {
                    nodeName: string;
                    categoryName: string;
                })[]
            >
        > = {};

        Object.values(basicNodeConfigs).forEach(item => {
            const { category, labelIntlKey } = item;
            const cateConfig = nodeCategoryConfigs[category];

            if (!category || category === 'entry') return;
            result[category] = result[category] || [];
            result[category].push({
                ...item,
                nodeName: getIntlText(labelIntlKey),
                categoryName: getIntlText(cateConfig.labelIntlKey),
            });
        });

        return result;
    }, [getIntlText]);

    const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setAnchorEl(e.currentTarget);
        onChange?.(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        onChange?.(false);
    };

    const handleClick = (type: WorkflowNodeType) => {
        console.log('add node type', type);

        // TODO: 调用通用添加节点逻辑

        handleClose();
    };

    useEffect(() => {
        onChange?.(!!anchorEl);
    }, [anchorEl, onChange]);

    return (
        <div className="ms-workflow-node-menu-popover-root">
            <Stack sx={{ alignItems: 'center', justifyContent: 'center' }} onClick={handleOpen}>
                {children || <AddCircleIcon />}
            </Stack>
            <Menu
                className="ms-workflow-node-menu-popover"
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 24,
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                slotProps={{
                    paper: { elevation: 0 },
                }}
                {...menuProps}
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                {Object.entries(menuOptions).map(([category, menus]) => {
                    const categoryName = menus[0]?.categoryName;
                    const children = [
                        <MenuItem disabled key={category}>
                            {categoryName}
                        </MenuItem>,
                    ];

                    children.push(
                        ...menus.map(menu => (
                            <MenuItem key={menu.type} onClick={() => handleClick(menu.type)}>
                                <span
                                    className="icon"
                                    style={{ backgroundColor: menu.iconBgColor }}
                                >
                                    {menu.icon}
                                </span>
                                <span className="title">{menu.nodeName}</span>
                            </MenuItem>
                        )),
                    );

                    return children;
                })}
            </Menu>
        </div>
    );
};

export default NodeMenu;
