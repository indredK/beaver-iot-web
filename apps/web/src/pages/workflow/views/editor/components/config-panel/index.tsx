import { useState, useCallback } from 'react';
import {
    Panel,
    useOnSelectionChange,
    type ReactFlowProps,
    type UseOnSelectionChangeOptions,
} from '@xyflow/react';

/**
 * 配置面板组件
 */
const ConfigPanel = () => {
    const [selectedNodes, setSelectedNodes] = useState<ReactFlowProps['nodes']>([]);
    const onChange = useCallback<UseOnSelectionChangeOptions['onChange']>(({ nodes }) => {
        setSelectedNodes(nodes);
    }, []);

    useOnSelectionChange({
        onChange,
    });

    return (
        <Panel position="top-right">
            <div>配置面板</div>
        </Panel>
    );
};

export default ConfigPanel;
