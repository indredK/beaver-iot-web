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
    FlagIcon,
} from '@milesight/shared/src/components';

/**
 * 最小缩放比例
 */
export const MIN_ZOOM = 0.25;

/**
 * 最大缩放比例
 */
export const MAX_ZOOM = 2;

type NodeCategoryConfigItemType = {
    /** 节点分类国际化文案 Key */
    labelIntlKey: string;
};

/**
 * 节点分类配置
 */
export const nodeCategoryConfigs: Record<WorkflowNodeCategoryType, NodeCategoryConfigItemType> = {
    entry: {
        labelIntlKey: 'workflow.label.node_category_entry',
    },
    control: {
        labelIntlKey: 'workflow.label.node_category_control',
    },
    action: {
        labelIntlKey: 'workflow.label.node_category_action',
    },
    external: {
        labelIntlKey: 'workflow.label.node_category_external',
    },
};

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
     */
    category: WorkflowNodeCategoryType;
    /**
     * 是否支持独立测试
     */
    enableTest?: boolean;
};

/**
 * 节点基础配置
 */
export const basicNodeConfigs: Record<WorkflowNodeType, NodeConfigItemType> = {
    trigger: {
        type: 'trigger',
        labelIntlKey: 'workflow.label.trigger_node_name',
        icon: <InputIcon />,
        iconBgColor: '#3491FA',
        category: 'entry',
    },
    timer: {
        type: 'timer',
        labelIntlKey: 'workflow.label.timer_node_name',
        icon: <TimerIcon />,
        iconBgColor: '#3491FA',
        category: 'entry',
    },
    listener: {
        type: 'listener',
        labelIntlKey: 'workflow.label.listener_node_name',
        icon: <HearingIcon />,
        iconBgColor: '#3491FA',
        category: 'entry',
    },
    ifelse: {
        type: 'ifelse',
        labelIntlKey: 'workflow.label.ifelse_node_name',
        icon: <CallSplitIcon sx={{ transform: 'rotate(90deg)' }} />,
        iconBgColor: '#00ACC1',
        category: 'control',
        enableTest: true,
    },
    end: {
        type: 'end',
        labelIntlKey: 'workflow.label.end_node_name',
        icon: <FlagIcon />,
        iconBgColor: '#F57C00',
        category: 'control',
    },
    code: {
        type: 'code',
        labelIntlKey: 'workflow.label.code_node_name',
        icon: <SettingsEthernetIcon />,
        iconBgColor: '#00ACC1',
        category: 'action',
        enableTest: true,
    },
    assigner: {
        type: 'assigner',
        labelIntlKey: 'workflow.label.assigner_node_name',
        icon: <EntityIcon />,
        iconBgColor: '#00ACC1',
        category: 'action',
    },
    service: {
        type: 'service',
        labelIntlKey: 'workflow.label.service_node_name',
        icon: <RoomServiceIcon />,
        iconBgColor: '#7E57C2',
        category: 'action',
        enableTest: true,
    },
    select: {
        type: 'select',
        labelIntlKey: 'workflow.label.select_node_name',
        icon: <EntityIcon />,
        iconBgColor: '#00ACC1',
        category: 'action',
        enableTest: true,
    },
    email: {
        type: 'email',
        labelIntlKey: 'workflow.label.email_node_name',
        icon: <EmailIcon />,
        iconBgColor: '#7E57C2',
        category: 'external',
        enableTest: true,
    },
    webhook: {
        type: 'webhook',
        labelIntlKey: 'workflow.label.webhook_node_name',
        icon: <WebhookIcon />,
        iconBgColor: '#7E57C2',
        category: 'external',
        enableTest: true,
    },
};
