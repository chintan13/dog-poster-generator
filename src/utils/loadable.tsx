import { lazy, Suspense } from "react";
import LoadingCover from "../components/LoadingCover";

const loadable = (importFunc: any) => {
    const LazyComponent = lazy(importFunc);

    return (props: any) => (
        <Suspense fallback={<LoadingCover />}>
            <LazyComponent {...props} />
        </Suspense>
    );
};

export default loadable;
