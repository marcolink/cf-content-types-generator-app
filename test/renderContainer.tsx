import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {render} from "@testing-library/react";
import React, {ReactNode} from "react";

export function renderContainer(node: ReactNode) {
    const queryClient = new QueryClient()
    return render(
        <QueryClientProvider client={queryClient}>
            {node}
        </QueryClientProvider>
    )
}
