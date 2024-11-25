import React, { useMemo } from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import { useI18n } from '@milesight/shared/src/hooks';
import { basicNodeConfigs } from '../constant';
import { Handle, IfElseNode, NodeContainer } from '../components';

/**
 * 生成所有节点类型
 */
const useNodeTypes = () => {
    const { getIntlText } = useI18n();

    const nodeTypes = useMemo(() => {
        const result = (Object.keys(basicNodeConfigs) as WorkflowNodeType[]).reduce(
            (acc, type) => {
                const config = { ...basicNodeConfigs[type] };
                const generateHandle = (type: WorkflowNodeType, props: NodeProps) => {
                    switch (type) {
                        case 'trigger':
                        case 'timer':
                        case 'listener': {
                            return [
                                <Handle
                                    type="source"
                                    position={Position.Right}
                                    nodeProps={props}
                                />,
                            ];
                        }
                        case 'end': {
                            return [
                                <Handle type="target" position={Position.Left} nodeProps={props} />,
                            ];
                        }
                        default: {
                            break;
                        }
                    }
                };

                acc[type] = props => (
                    <NodeContainer
                        {...config}
                        title={getIntlText(config.labelIntlKey)}
                        handles={generateHandle(type, props)}
                        nodeProps={props}
                    />
                );

                if (type === 'ifelse') acc[type] = IfElseNode;
                return acc;
            },
            {} as Record<WorkflowNodeType, React.FC<any>>,
        );

        return result;
    }, [getIntlText]);

    return nodeTypes;
};

export default useNodeTypes;
