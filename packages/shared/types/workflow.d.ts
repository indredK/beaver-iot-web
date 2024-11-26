/**
 * 节点类型
 * @param trigger 触发器节点
 * @param timer 定时节点
 * @param listener 监听器节点
 * @param ifelse 条件节点
 * @param end 结束节点
 * @param code 代码节点
 * @param service 服务节点
 * @param assigner 赋值节点
 * @param select 选择节点
 * @param email 邮件节点
 * @param webhook webhook 节点
 */
declare type WorkflowNodeType =
    | 'trigger'
    | 'timer'
    | 'listener'
    | 'ifelse'
    | 'end'
    | 'code'
    | 'service'
    | 'assigner'
    | 'select'
    | 'email'
    | 'webhook';

/**
 * 节点基础数据类型
 */
declare type BaseNodeDataType = {
    /** 节点状态（以 $ 开头的均为前端私有属性） */
    $status?: 'error' | 'success';
};

/**
 * 输入节点参数类型
 */
declare type TriggerNodeDataType = BaseNodeDataType & {
    /** 输入参数 */
    inputs: {
        name: string;
        type: EntityValueDataType;
        value: any;
    }[];
};

/**
 * 定时器节点参数类型
 */
declare type TimerNodeDataType = BaseNodeDataType & {
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
declare type ListenerNodeDataType = BaseNodeDataType & {
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
    // outputs?: {
    //     key: ApiKey;
    //     name: string;
    //     type: EntityType;
    //     value: any;
    // }[];
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

/**
 * 条件节点参数类型
 *
 * 注意：实际节点渲染时需默认增加一个 else 分支
 */
declare type IfElseNodeDataType = BaseNodeDataType & {
    cases: {
        conditions: {
            key: ApiKey;
            operator: WorkflowFilterOperator;
            value?: any;
        }[];
        logic?: WorkflowLogicOperator;
    }[];
};

/**
 * 结束节点参数类型
 */
declare type EndNodeDataType = BaseNodeDataType & {
    /** 输出参数 */
    outputs: {
        key: ApiKey;
        type: EntityValueDataType;
        value: any;
    }[];
};

/**
 * 代码节点参数类型
 */
declare type CodeNodeDataType = BaseNodeDataType & {
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
 * 服务节点参数类型
 */
declare type ServiceNodeDataType = BaseNodeDataType & {
    /** 服务 Key */
    key: ApiKey;
    /** 输入参数 */
    inputs: {
        name: ApiKey;
        type: EntityValueDataType;
        value: any;
        source: ApiKey;
    }[];
    /** 输出参数 */
    // outputs: {
    //     name: ApiKey;
    //     type: EntityValueDataType;
    //     value: any;
    // }[];
};

/**
 * 赋值节点参数类型
 */
declare type AssignerNodeDataType = BaseNodeDataType & {
    settings: {
        /** 实体 Key */
        key: ApiKey;
        /** 数据来源（上级节点的输出参数） */
        source: ApiKey;
    }[];
};

/**
 * 实体选择节点参数类型
 */
declare type SelectNodeDataType = BaseNodeDataType & {
    settings: {
        /**
         * 监听类型
         * @param change 实体数据变更
         * @param call 服务调用
         * @param report 事件上报
         */
        type: 'change' | 'call' | 'report';
        /** 监听目标 */
        target: ApiKey;
    }[];
};

/**
 * 邮件节点参数类型
 */
declare type EmailNodeDataType = BaseNodeDataType & {
    /** 邮箱类型 */
    type: 'gmail';
    /** 邮箱 API Key */
    apiKey: ApiKey;
    /** 邮箱 */
    email: string | string[];
    /** 邮件内容 */
    content: string;
    /** 输出参数 */
    // outputs: {
    //     name: ApiKey;
    //     type: EntityValueDataType;
    //     value: any;
    // }[];
};

/**
 * Webhook 节点参数类型
 */
declare type WebhookNodeDataType = BaseNodeDataType & {
    /** 推送数据（来源于上个节点） */
    data: ApiKey[];
    /** 自定义数据 */
    customData: {
        key: ApiKey;
        type: EntityValueDataType;
        value: any;
    }[];
    /** Webhook URL */
    url: string;
    /** Webhook 密钥 */
    secret: string;
    /** 输出参数 */
    outputs: {
        name: ApiKey;
        type: EntityValueDataType;
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
    | WorkflowNodeDataType<'trigger', TriggerNodeDataType>
    | WorkflowNodeDataType<'timer', TimerNodeDataType>
    | WorkflowNodeDataType<'listener', ListenerNodeDataType>
    | WorkflowNodeDataType<'ifelse', IfElseNodeDataType>
    | WorkflowNodeDataType<'end', EndNodeDataType>
    | WorkflowNodeDataType<'code', CodeNodeDataType>
    | WorkflowNodeDataType<'service', ServiceNodeDataType>
    | WorkflowNodeDataType<'assigner', AssignerNodeDataType>
    | WorkflowNodeDataType<'select', SelectNodeDataType>
    | WorkflowNodeDataType<'email', EmailNodeDataType>
    | WorkflowNodeDataType<'webhook', WebhookNodeDataType>;

/**
 * 工作流边类型
 */
declare type WorkflowEdgeType = {
    /** 边 ID */
    id: ApiKey;
    /** 起点 Node ID */
    source: ApiKey;
    /** 终点 Node ID */
    target: ApiKey;
    /** 起点 Handle ID */
    sourceHandle: ApiKey;
    /** 终点 Handle ID */
    targetHandle: ApiKey;
};

/**
 * 工作流数据类型
 */
declare type WorkflowSchema = {
    /** 版本号 */
    version: string;
    /** 名称 */
    name: string;
    /** 描述 */
    remark?: string;
    /** 节点 */
    nodes: WorkflowNodeType[];
    /** 边 */
    edges: WorkflowEdgeType[];
};
