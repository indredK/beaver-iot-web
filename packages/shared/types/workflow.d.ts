/**
 * 节点类型
 * @param input 输入节点
 * @param end 结束节点
 * @param code 函数节点
 * @param ifelse 条件节点
 * @param assigner 赋值节点
 * @param timer 定时节点
 * @param event 事件节点
 * @param service 服务节点
 * @param email 邮件节点
 * @param webhook webhook 节点
 */
declare type WorkflowNodeType =
    | 'input'
    | 'end'
    | 'code'
    | 'ifelse'
    | 'assigner'
    | 'timer'
    | 'event'
    | 'service'
    | 'email'
    | 'webhook';

/**
 * 输入节点参数类型
 */
declare type InputNodeArgumentType = {
    /** 输入参数 */
    inputs: {
        name: string;
        type: EntityValueAttributeType;
        value: any;
    }[];
};

/**
 * 结束节点参数类型
 */
declare type EndNodeArgumentType = {
    /** 输出参数 */
    outputs: {
        key: ApiKey;
        type: EntityValueAttributeType;
        value: any;
    }[];
};

/**
 * 定时器节点参数类型
 */
declare type TimerNodeArgumentType = {
    /**
     * 执行类型
     * @param ONCE 单次执行
     * @param CYCLE 周期执行
     */
    type: 'ONCE' | 'CYCLE';
    /** 首次执行时间 */
    firstExecutionTime?: number;
    /** 过期时间，默认 2035/01/01 00:00 */
    expireTime?: number;
    /** 周期配置 */
    settings?: {
        /** 执行周期 */
        period:
            | 'EVERYDAY'
            | 'Monday'
            | 'Tuesday'
            | 'Wednesday'
            | 'Thursday'
            | 'Friday'
            | 'Saturday'
            | 'Sunday';
        /**
         * 执行时间，该数据为零点到所选时间点的毫秒数，默认 32400000(09:00)
         */
        time: number;
    }[];
};

/**
 * 事件节点参数类型
 */
declare type EventNodeArgumentType = {
    /**
     * 监听类型
     * @param change 实体数据变更
     * @param call 服务调用
     * @param report 事件上报
     */
    type: 'change' | 'call' | 'report';
    /** 监听目标 */
    target: ApiKey;
    /** 输出参数 */
    outputs?: {
        key: ApiKey;
        name: string;
        type: EntityType;
        value: any;
    }[];
};

declare type WorkflowLogicOperator = 'AND' | 'OR';

declare type WorkflowFilterOperator =
    | 'CONTAINS'
    | 'NOT_CONTAINS'
    | 'START_WITH'
    | 'END_WITH'
    | 'IS'
    | 'IS_NOT'
    | 'IS_EMPTY'
    | 'IS_NOT_EMPTY';

declare type WorkflowLogicConditionType = {
    key: ApiKey;
    operator: WorkflowFilterOperator;
    value?: any;
    logic?: WorkflowLogicOperator;
};

/**
 * 条件节点参数类型
 *
 * 注意：实际节点渲染时需默认增加一个 else 分支
 */
declare type IfElseNodeArgumentType = {
    /** IF 条件 */
    if: WorkflowLogicConditionType[];
    /** ELSEIF 条件 */
    elseif: WorkflowLogicConditionType[][];
};

/**
 * 代码节点参数类型
 */
declare type CodeNodeArgumentType = {
    /** 输入参数 */
    inputs: {
        name: ApiKey;
        value: any;
    }[];
    /** 输出参数 */
    outputs: {
        name: ApiKey;
        type: EntityValueDataType;
    }[];
    /** 代码 */
    code: string;
};

/**
 * 赋值节点参数类型
 */
declare type AssignerNodeArgumentType = {
    settings: {
        /** 实体 Key */
        key: ApiKey;
        /** 数据来源（上级节点的输出参数） */
        source: ApiKey;
    }[];
};

/**
 * 服务节点参数类型
 */
declare type ServiceNodeArgumentType = {
    /** 服务 Key */
    key: ApiKey;
    /** 输入参数 */
    inputs: {
        name: ApiKey;
        type: EntityValueAttributeType;
        value: any;
        source: ApiKey;
    }[];
    /** 输出参数 */
    outputs: {
        name: ApiKey;
        type: EntityValueAttributeType;
        value: any;
    }[];
};

/**
 * 邮件节点参数类型
 */
declare type EmailNodeArgumentType = {
    /** 邮箱类型 */
    type: 'gmail';
    /** 邮箱 API Key */
    apiKey: ApiKey;
    /** 邮箱 */
    email: string | string[];
    /** 邮件内容 */
    content: string;
    /** 输出参数 */
    outputs: {
        name: ApiKey;
        type: EntityValueAttributeType;
        value: any;
    }[];
};

/**
 * Webhook 节点参数类型
 */
declare type WebhookNodeArgumentType = {
    /** 推送数据（来源于上个节点） */
    data: ApiKey[];
    /** 自定义数据 */
    customData: {
        key: ApiKey;
        type: EntityValueAttributeType;
        value: any;
    }[];
    /** Webhook URL */
    url: string;
    /** Webhook 密钥 */
    secret: string;
    /** 输出参数 */
    outputs: {
        name: ApiKey;
        type: EntityValueAttributeType;
        value: any;
    }[];
};

declare type WorkflowNodeDataType<T extends WorkflowNodeType, D extends Record<string, any>> = {
    /** 节点 id */
    id: ApiKey;
    /** 节点位置 */
    position: {
        x: number;
        y: number;
    };
    /** 节点类型 */
    type: T;
    /** 节点数据 */
    data?: D;
};

/**
 * 工作流节点类型
 */
declare type WorkflowNodeType =
    | WorkflowNodeDataType<'input', InputNodeArgumentType>
    | WorkflowNodeDataType<'end', EndNodeArgumentType>
    | WorkflowNodeDataType<'code', CodeNodeArgumentType>
    | WorkflowNodeDataType<'ifelse', IfElseNodeArgumentType>
    | WorkflowNodeDataType<'assigner', AssignerNodeArgumentType>
    | WorkflowNodeDataType<'timer', TimerNodeArgumentType>
    | WorkflowNodeDataType<'event', EventNodeArgumentType>
    | WorkflowNodeDataType<'service', ServiceNodeArgumentType>
    | WorkflowNodeDataType<'email', EmailNodeArgumentType>
    | WorkflowNodeDataType<'webhook', WebhookNodeArgumentType>;

/**
 * 工作流连线类型
 */
declare type WorkflowEdgeType = {
    id: ApiKey;
    source: ApiKey;
    target: ApiKey;
};
