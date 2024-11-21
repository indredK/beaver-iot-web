import React, { useState, useCallback } from 'react';
import cls from 'classnames';
import { useDebounceFn } from 'ahooks';
import { Handle as XHandle, type HandleProps } from '@xyflow/react';
import { useI18n } from '@milesight/shared/src/hooks';
import { AddCircleIcon } from '@milesight/shared/src/components';
// import { Tooltip } from '@/components';
import './style.less';

/**
 * 自定义操作柄
 */
const Handle: React.FC<HandleProps> = props => {
    const { getIntlHtml } = useI18n();
    const [showTooltip, setShowTooltip] = useState(false);

    const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // TODO: 弹出操作菜单
        console.log('popup node menu...');
        e.stopPropagation();
    }, []);

    const { run: handleMouseEnter, cancel: cancelHandleMouseEnter } = useDebounceFn(
        () => setShowTooltip(true),
        { wait: 500 },
    );

    return (
        <XHandle
            {...props}
            className="ms-workflow-handle"
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
