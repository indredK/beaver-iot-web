import React, { useState, useCallback } from 'react';
import cls from 'classnames';
import { useDebounceFn } from 'ahooks';
import { Handle as XHandle, useEdges, type HandleProps, type NodeProps } from '@xyflow/react';
import { useI18n } from '@milesight/shared/src/hooks';
import { AddCircleIcon } from '@milesight/shared/src/components';
import './style.less';

export interface Props extends HandleProps {
    /**
     * 节点所有属性
     */
    nodeProps: NodeProps;
}

/**
 * 自定义操作柄
 */
const Handle: React.FC<Props> = ({ nodeProps, ...props }) => {
    const { getIntlHtml } = useI18n();
    const edges = useEdges();
    const targetAddEnabled = edges.every(edge => edge.target !== nodeProps.id);

    // ---------- 处理 Tooltip 显示逻辑 ----------
    const [showTooltip, setShowTooltip] = useState(false);
    const { run: handleMouseEnter, cancel: cancelHandleMouseEnter } = useDebounceFn(
        () => {
            if (props.type === 'target' && !targetAddEnabled) return;
            setShowTooltip(true);
        },
        { wait: 500 },
    );

    // ---------- 操作柄点击回调 ----------
    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // TODO: 弹出操作菜单
        console.log('popup node menu...');
        e.stopPropagation();
    }, []);

    return (
        <XHandle
            {...props}
            className={cls('ms-workflow-handle', {
                'target-enable-add': props.type === 'target' && targetAddEnabled,
            })}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => {
                setShowTooltip(false);
                cancelHandleMouseEnter();
            }}
        >
            {/* 采用自定义 Tooltip 实现，解决 Tooltip 组件启用时无法连线问题 */}
            <span className={cls('ms-workflow-handle-tooltip', { hidden: !showTooltip })}>
                {getIntlHtml('workflow.label.handle_tooltip')}
            </span>
            <AddCircleIcon />
        </XHandle>
    );
};

export default React.memo(Handle);
