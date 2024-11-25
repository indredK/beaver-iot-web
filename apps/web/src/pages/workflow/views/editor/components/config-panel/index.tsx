import { useState, useCallback, useMemo } from 'react';
import {
    Panel,
    useOnSelectionChange,
    type ReactFlowProps,
    type UseOnSelectionChangeOptions,
} from '@xyflow/react';
import cls from 'classnames';
import { useI18n } from '@milesight/shared/src/hooks';
import { basicNodeConfigs } from '../../constant';
import './style.less';

/**
 * 配置面板组件
 */
const ConfigPanel = () => {
    const { getIntlText } = useI18n();
    const [selectedNodes, setSelectedNodes] = useState<ReactFlowProps['nodes']>([]);
    const nodeConfig = useMemo(() => {
        if (!selectedNodes?.length || selectedNodes.length > 1) {
            return;
        }

        const nodeType = selectedNodes[0].type as WorkflowNodeType;
        return basicNodeConfigs[nodeType];
    }, [selectedNodes]);

    const onChange = useCallback<UseOnSelectionChangeOptions['onChange']>(({ nodes }) => {
        setSelectedNodes(nodes);
    }, []);

    useOnSelectionChange({
        onChange,
    });

    return (
        <Panel
            position="top-right"
            className={cls('ms-workflow-panel-config-root', {
                hidden: !nodeConfig,
            })}
        >
            {nodeConfig?.labelIntlKey && (
                <div className="ms-workflow-panel-config">
                    <div className="ms-workflow-panel-config-header">
                        <span>{getIntlText(nodeConfig.labelIntlKey)}</span>
                    </div>
                    <div className="ms-workflow-panel-config-body">
                        <span>Node Body</span>
                    </div>
                </div>
            )}
        </Panel>
    );
};

export default ConfigPanel;
