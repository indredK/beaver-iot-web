import {
    SettingsEthernetIcon,
    EntityIcon,
    RoomServiceIcon,
    EmailIcon,
    WebhookIcon,
    TimerIcon,
    HearingIcon,
    InputIcon,
    CallSplitIcon,
} from '@milesight/shared/src/components';

/**
 * 最小缩放比例
 */
export const MIN_ZOOM = 0.25;

/**
 * 最大缩放比例
 */
export const MAX_ZOOM = 2;

/**
 * 节点配置项类型
 */
export type NodeConfigItemType = {
    /**
     * 节点类型
     */
    type: WorkflowNodeType;
    /**
     * 节点 Label 的国际化文案 Key
     */
    labelIntlKey: string;
    /**
     * 节点 Icon
     */
    icon: React.ReactNode;
    /**
     * 节点 Icon 背景色
     */
    iconBgColor: string;
    /**
     * 节点分类
     * @param start 开始节点
     * @param end 结束节点
     * @param logic 逻辑节点
     * ...
     */
    category?: 'start' | 'end' | 'logic';
};

/**
 * 节点基础配置
 */
export const basicNodeConfigs: Record<WorkflowNodeType, NodeConfigItemType> = {
    input: {
        type: 'input',
        labelIntlKey: 'workflow.label.input_node_name',
        icon: <InputIcon />,
        iconBgColor: '#3491FA',
        category: 'start',
    },
    timer: {
        type: 'timer',
        labelIntlKey: 'workflow.label.timer_node_name',
        icon: <TimerIcon />,
        iconBgColor: '#3491FA',
        category: 'start',
    },
    event: {
        type: 'event',
        labelIntlKey: 'workflow.label.event_node_name',
        icon: <HearingIcon />,
        iconBgColor: '#3491FA',
        category: 'start',
    },
    end: {
        type: 'end',
        labelIntlKey: 'workflow.label.end_node_name',
        icon: <InputIcon />,
        iconBgColor: '#F57C00',
        category: 'end',
    },
    ifelse: {
        type: 'ifelse',
        labelIntlKey: 'workflow.label.ifelse_node_name',
        icon: <CallSplitIcon />,
        iconBgColor: '#00ACC1',
    },
    code: {
        type: 'code',
        labelIntlKey: 'workflow.label.code_node_name',
        icon: <SettingsEthernetIcon />,
        iconBgColor: '#00ACC1',
    },
    assigner: {
        type: 'assigner',
        labelIntlKey: 'workflow.label.assigner_node_name',
        icon: <EntityIcon />,
        iconBgColor: '#00ACC1',
    },
    service: {
        type: 'service',
        labelIntlKey: 'workflow.label.service_node_name',
        icon: <RoomServiceIcon />,
        iconBgColor: '#7E57C2',
    },
    email: {
        type: 'email',
        labelIntlKey: 'workflow.label.email_node_name',
        icon: <EmailIcon />,
        iconBgColor: '#7E57C2',
    },
    webhook: {
        type: 'webhook',
        labelIntlKey: 'workflow.label.webhook_node_name',
        icon: <WebhookIcon />,
        iconBgColor: '#7E57C2',
    },
};
