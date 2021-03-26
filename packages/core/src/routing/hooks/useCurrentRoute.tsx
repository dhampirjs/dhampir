import * as React from 'react';

const useCurrentRoute = (): string => {
    const [path, setPath] = React.useState('/');
    React.useEffect(() => {
        setPath('');
    }, []);

    return path;
};

export {
    useCurrentRoute,
}
