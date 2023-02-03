import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import React from 'react';
import {render} from 'react-dom';

import {GlobalStyles} from '@contentful/f36-components';
import {SDKProvider} from '@contentful/react-apps-toolkit';

import LocalhostWarning from './components/LocalhostWarning';
import App from './App';

const root = document.getElementById('root');
const queryClient = new QueryClient()

if (process.env.NODE_ENV === 'development' && window.self === window.top) {
    // You can remove this if block before deploying your app
    render(<LocalhostWarning/>, root);
} else {
    render(
        <QueryClientProvider client={queryClient}>
            <SDKProvider>
                <GlobalStyles/>
                <App/>
            </SDKProvider>
        </QueryClientProvider>
        ,
        root
    );
}
