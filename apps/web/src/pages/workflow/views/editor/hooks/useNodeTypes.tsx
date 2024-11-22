import React, { useMemo } from 'react';
import { Position } from '@xyflow/react';
import { useI18n } from '@milesight/shared/src/hooks';
import { basicNodeConfigs } from '../constant';
import { Handle, IfElseNode, NodeContainer } from '../components';

/**
 * 节点组件配置
 */
const nodeConfigs = Object.values(basicNodeConfigs).map(item => {
    const result: typeof item & { handles?: React.ReactNode[] } = { ...item };

    switch (result.type) {
        case 'input':
        case 'timer':
        case 'event': {
            result.handles = [<Handle type="source" position={Position.Right} />];
            break;
        }
        case 'end': {
            result.handles = [<Handle type="target" position={Position.Left} />];
            break;
        }
        default: {
            break;
        }
    }

    return result;
});

/**
 * 生成所有节点类型
 */
const useNodeTypes = () => {
    const { getIntlText } = useI18n();

    const nodeTypes = useMemo(() => {
        const result: Partial<Record<WorkflowNodeType, React.FC<any>>> = {
            ifelse: IfElseNode,
        };

        nodeConfigs.forEach(({ labelIntlKey, ...config }) => {
            result[config.type] =
                result[config.type] ||
                (props => (
                    <NodeContainer
                        {...config}
                        title={getIntlText(labelIntlKey)}
                        nodeProps={props}
                    />
                ));
        });

        return result;
    }, [getIntlText]);

    return nodeTypes;
};

export default useNodeTypes;
