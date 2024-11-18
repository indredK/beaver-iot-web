import React from 'react';
import { Panel, useReactFlow, useViewport } from '@xyflow/react';

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

const Controls: React.FC<ControlsProps> = ({ minZoom, maxZoom }) => {
    const { zoom } = useViewport();
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    return (
        <Panel position="bottom-left">
            <button type="button" disabled={!!maxZoom && maxZoom === zoom} onClick={() => zoomIn()}>
                zoomIn
            </button>
            <button
                type="button"
                disabled={!!minZoom && minZoom === zoom}
                onClick={() => zoomOut()}
            >
                zoomOut
            </button>
            <button type="button" onClick={() => fitView()}>
                fitView
            </button>
        </Panel>
    );
};

export default Controls;
