import { useCallback } from 'react';

const useNodeInteractions = () => {
    const handleNodeAdd = useCallback((nodeType: string) => {
        console.log({ nodeType });
    }, []);

    const handleNodeDelete = useCallback((nodeId: ApiKey) => {
        console.log({ nodeId });
    }, []);

    const handleNodeChange = useCallback((nodeType: string) => {
        console.log({ nodeType });
    }, []);

    return {
        handleNodeAdd,
        handleNodeDelete,
    };
};

export default useNodeInteractions;
