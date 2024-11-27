import React from 'react';
import { Panel, useReactFlow, useViewport } from '@xyflow/react';
import { Stack, Paper, ButtonGroup, Button } from '@mui/material';
import {
    ZoomInIcon,
    ZoomOutIcon,
    MyLocationIcon,
    AddCircleIcon,
} from '@milesight/shared/src/components';
import NodeMenu from '../node-menu';
import './style.less';

export interface ControlsProps {
    /**
     * 最小缩放比例
     */
    minZoom?: number;

    /**
     * 最大缩放比例
     */
    maxZoom?: number;
}

/**
 * 工作流编辑器工具栏
 */
const Controls: React.FC<ControlsProps> = ({ minZoom, maxZoom }) => {
    const { zoom } = useViewport();
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    return (
        <Panel position="bottom-left" className="ms-workflow-controls">
            <Stack direction="row" spacing={1}>
                <Paper elevation={6}>
                    <ButtonGroup variant="text">
                        <Button disabled={!!minZoom && minZoom === zoom} onClick={() => zoomOut()}>
                            <ZoomOutIcon sx={{ fontSize: 20 }} />
                        </Button>
                        <Button disabled={!!maxZoom && maxZoom === zoom} onClick={() => zoomIn()}>
                            <ZoomInIcon sx={{ fontSize: 20 }} />
                        </Button>
                        <Button onClick={() => fitView()}>
                            <MyLocationIcon sx={{ fontSize: 20 }} />
                        </Button>
                    </ButtonGroup>
                </Paper>
                <Paper elevation={6}>
                    <NodeMenu>
                        <Button
                            sx={{ minWidth: 'auto' }}
                            onClick={() => console.log('popup node menu...')}
                        >
                            <AddCircleIcon sx={{ fontSize: 20 }} />
                        </Button>
                    </NodeMenu>
                </Paper>
            </Stack>
        </Panel>
    );
};

export default React.memo(Controls);
