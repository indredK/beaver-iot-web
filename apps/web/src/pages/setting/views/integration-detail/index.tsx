import { useState, useLayoutEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useRequest } from 'ahooks';
import { DevicesOtherIcon, EntityIcon } from '@milesight/shared/src/components';
import { thousandSeparate, objectToCamelCase } from '@milesight/shared/src/utils/tools';
import { Breadcrumbs } from '@/components';
import {
    integrationAPI,
    IntegrationAPISchema,
    awaitWrap,
    getResponseData,
    isRequestSuccess,
} from '@/services/http';
import { GeneralContent, MscContent } from './components';
import './style.less';

type TabKey = 'config' | 'function';
type TabItem = {
    key: TabKey;
    label: string;
    component: React.ReactNode;
};

const InformationDetail = () => {
    const { integrationId } = useParams();

    // ---------- 集成详情数据逻辑 ----------
    const { state } = useLocation();
    const [basicInfo, setBasicInfo] =
        useState<ObjectToCamelCase<IntegrationAPISchema['getList']['response'][0]>>();
    const { data: entityList, refresh: refreshInteDetail } = useRequest(
        async () => {
            if (!integrationId) return;
            const [error, resp] = await awaitWrap(integrationAPI.getDetail({ id: integrationId }));
            const respData = getResponseData(resp);

            if (error || !respData || !isRequestSuccess(resp)) {
                return;
            }
            const data = objectToCamelCase(respData);

            setBasicInfo(data);
            return data.integrationEntities;
        },
        {
            debounceWait: 300,
            refreshDeps: [integrationId],
        },
    );
    const isMscIntegration = basicInfo?.id === 'msc-integration';

    useLayoutEffect(() => {
        if (!state?.id || state.id !== integrationId) return;
        setBasicInfo(state);
    }, [state, integrationId]);

    return (
        <div className="ms-main">
            <Breadcrumbs
                rewrite={navs => {
                    const newNavs = [...navs];
                    const lastNav = newNavs[newNavs.length - 1];

                    if (basicInfo?.name) {
                        lastNav.path = undefined;
                        newNavs.push({
                            path: lastNav.path,
                            title: basicInfo.name,
                        });
                    }

                    return newNavs;
                }}
            />
            <div className="ms-view ms-view-int-detail">
                <div className="ms-view-int-detail__header">
                    <div className="detail">
                        <div className="icon">
                            {!!basicInfo?.icon && <img src={basicInfo.icon} alt={basicInfo.name} />}
                        </div>
                        <Stack direction="column">
                            <div className="title">
                                <h2>{basicInfo?.name}</h2>
                                <div className="meta">
                                    <span className="meta-item">
                                        <DevicesOtherIcon />
                                        <span>
                                            {thousandSeparate(basicInfo?.deviceCount) || '-'}
                                        </span>
                                    </span>
                                    <span className="meta-item">
                                        <EntityIcon />
                                        <span>
                                            {thousandSeparate(basicInfo?.entityCount) || '-'}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            {!!basicInfo?.description && (
                                <p className="desc">{basicInfo.description}</p>
                            )}
                        </Stack>
                    </div>
                </div>
                <div className="ms-view-int-detail__body">
                    {isMscIntegration ? (
                        <MscContent entities={entityList} onUpdateSuccess={refreshInteDetail} />
                    ) : (
                        <GeneralContent entities={entityList} onUpdateSuccess={refreshInteDetail} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default InformationDetail;
