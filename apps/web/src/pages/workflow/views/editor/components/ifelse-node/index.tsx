import React from 'react';
import { Position, type Node, type NodeProps } from '@xyflow/react';
import { useI18n } from '@milesight/shared/src/hooks';
import { CallSplitIcon } from '@milesight/shared/src/components';
import Handle from '../handle';
import NodeContainer from '../node-container';
import { basicNodeConfigs } from '../../constant';

export type IfElseNode = Node<InputNodeDataType, 'ifelse'>;

const nodeConfig = basicNodeConfigs.ifelse;

/**
 * 输入节点
 */
const IfElseNode: React.FC<NodeProps<IfElseNode>> = props => {
    const { getIntlText } = useI18n();
    console.log(props);

    return (
        <NodeContainer
            type="ifelse"
            title={getIntlText(nodeConfig.labelIntlKey)}
            icon={<CallSplitIcon />}
            iconBgColor={nodeConfig.iconBgColor}
            nodeProps={props}
            handles={[
                <Handle type="target" position={Position.Left} />,
                // TODO: 根据条件动态渲染多个操作柄
                <Handle type="source" position={Position.Right} style={{ top: 20 }} />,
            ]}
        >
            {/* TODO: render conditions detail... */}
            <span>render conditions...</span>
        </NodeContainer>
    );
};

export default React.memo(IfElseNode);
