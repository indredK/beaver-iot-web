import { useRef, useState, useEffect, Suspense } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Modal, JsonView } from '@milesight/shared/src/components';
import { useI18n } from '@milesight/shared/src/hooks';
import { TabPanel } from '@/components';
import { RenderConfig, RenderView } from '../render';
import plugins from '../plugins';
import './style.less';

interface ConfigPluginProps {
    config: CustomComponentProps;
    onClose: () => void;
    onOk?: (data: any) => void;
}

const ConfigPlugin = (props: ConfigPluginProps) => {
    const { getIntlText } = useI18n();
    const { config, onClose, onOk } = props;
    const ComponentConfig = (plugins as any)[`${config.type}Config`];
    const ComponentView = (plugins as any)[`${config.type}View`];
    const formRef = useRef<any>();
    const [formValues, setFormValues] = useState<any>({});
    const [tabKey, setTabKey] = useState<string>('basic');

    const handleClose = () => {
        onClose();
    };

    const handleChange = (values: any) => {
        const curFormValues = { ...formValues };
        Object.keys(values).forEach((key: string) => {
            if (values[key] !== undefined) {
                curFormValues[key] = values[key];
            }
        });
        if (curFormValues && Object.keys(curFormValues)?.length) {
            setFormValues(curFormValues);
        }
    };

    const handleOk = () => {
        formRef.current?.handleSubmit();
    };

    const handleSubmit = (data: any) => {
        onOk?.(data);
    };

    // 切换tab页签
    const handleChangeTabs = (_event: React.SyntheticEvent, newValue: string) => {
        setTabKey(newValue);
    };

    useEffect(() => {
        if (config?.config && Object.keys(config.config)?.length) {
            setFormValues({ ...config?.config });
        }
    }, [config]);

    return (
        <Modal
            onCancel={handleClose}
            onOk={handleOk}
            title={getIntlText('common.plugin_add_title', { 1: config.type })}
            width="80%"
        >
            <div className="config-plugin-container">
                <div className="config-plugin-container-left">
                    <Suspense>
                        {ComponentView ? (
                            <Suspense>
                                <ComponentView config={formValues} configJson={config} />
                            </Suspense>
                        ) : (
                            <RenderView configJson={config} config={formValues} />
                        )}
                    </Suspense>
                </div>
                <div className="config-plugin-container-right">
                    {/* <Tabs className="ms-tabs" value={tabKey} onChange={handleChangeTabs}>
                        <Tab
                            disableRipple
                            title={getIntlText('common.plugin_config.basic_setting')}
                            label={getIntlText('common.plugin_config.basic_setting')}
                            value="basic"
                        />
                        <Tab
                            disableRipple
                            title={getIntlText('common.plugin_config.advanced_setting')}
                            label={getIntlText('common.plugin_config.advanced_setting')}
                            value="advanced"
                        />
                    </Tabs> */}
                    <div className="ms-tab-content">
                        {/* <TabPanel value={tabKey} index="basic">
                            {ComponentConfig ? (
                                <ComponentConfig
                                    config={config}
                                    onChange={handleChange}
                                    value={formValues}
                                    ref={formRef}
                                    onOk={handleSubmit}
                                />
                            ) : (
                                <RenderConfig
                                    config={config}
                                    onOk={handleSubmit}
                                    ref={formRef}
                                    onChange={handleChange}
                                    value={formValues}
                                />
                            )}
                        </TabPanel>
                        <TabPanel value={tabKey} index="advanced">
                            <JsonView value={formValues} maintainEditStatus />
                        </TabPanel> */}
                        {ComponentConfig ? (
                            <Suspense>
                                <ComponentConfig
                                    config={config}
                                    onChange={handleChange}
                                    value={formValues}
                                    ref={formRef}
                                    onOk={handleSubmit}
                                />
                            </Suspense>
                        ) : (
                            <RenderConfig
                                config={config}
                                onOk={handleSubmit}
                                ref={formRef}
                                onChange={handleChange}
                                value={formValues}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ConfigPlugin;
