import React, { useMemo } from 'react';
import { Position, type NodeProps } from '@xyflow/react';
import { useI18n } from '@milesight/shared/src/hooks';
import {
    SettingsEthernetIcon,
    EntityIcon,
    RoomServiceIcon,
    EmailIcon,
    WebhookIcon,
    TimerIcon,
    HearingIcon,
    InputIcon,
} from '@milesight/shared/src/components';
import { Handle, IfElseNode, NodeContainer } from '../components';

/**
 * 节点组件配置
 */
const nodeConfigs: {
    type: WorkflowNodeType;
    labelIntlKey: string;
    icon: React.ReactNode;
    iconBgColor: string;
    handles?: React.ReactNode[];
}[] = [
    {
        type: 'input',
        labelIntlKey: 'workflow.label.input_node_name',
        icon: <InputIcon />,
        iconBgColor: '#3491FA',
        handles: [<Handle type="source" position={Position.Right} />],
    },
    {
        type: 'timer',
        labelIntlKey: 'workflow.label.timer_node_name',
        icon: <TimerIcon />,
        iconBgColor: '#3491FA',
        handles: [<Handle type="source" position={Position.Right} />],
    },
    {
        type: 'event',
        labelIntlKey: 'workflow.label.event_node_name',
        icon: <HearingIcon />,
        iconBgColor: '#3491FA',
        handles: [<Handle type="source" position={Position.Right} />],
    },
    {
        type: 'end',
        labelIntlKey: 'workflow.label.end_node_name',
        icon: <InputIcon />,
        iconBgColor: '#F57C00',
        handles: [<Handle type="target" position={Position.Left} />],
    },
    {
        type: 'code',
        labelIntlKey: 'workflow.label.code_node_name',
        icon: <SettingsEthernetIcon />,
        iconBgColor: '#00ACC1',
    },
    {
        type: 'assigner',
        labelIntlKey: 'workflow.label.assigner_node_name',
        icon: <EntityIcon />,
        iconBgColor: '#00ACC1',
    },
    {
        type: 'service',
        labelIntlKey: 'workflow.label.service_node_name',
        icon: <RoomServiceIcon />,
        iconBgColor: '#7E57C2',
    },
    {
        type: 'email',
        labelIntlKey: 'workflow.label.email_node_name',
        icon: <EmailIcon />,
        iconBgColor: '#7E57C2',
    },
    {
        type: 'webhook',
        labelIntlKey: 'workflow.label.webhook_node_name',
        icon: <WebhookIcon />,
        iconBgColor: '#7E57C2',
    },
];

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
            result[config.type] = props => (
                <NodeContainer
                    {...config}
                    title={getIntlText(labelIntlKey)}
                    status={props.data?.$status}
                />
            );
        });

        return result;
    }, [getIntlText]);

    return nodeTypes;
};

export default useNodeTypes;
