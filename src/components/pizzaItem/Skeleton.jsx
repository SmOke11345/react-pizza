import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={490}
        viewBox="0 0 280 490"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <rect x="3" y="345" rx="3" ry="3" width="130" height="25" />
        <rect x="3" y="244" rx="3" ry="3" width="270" height="84" />
        <rect x="30" y="200" rx="3" ry="3" width="200" height="30" />
        <circle cx="130" cy="100" r="80" />
        <rect x="183" y="343" rx="3" ry="3" width="90" height="25" />
    </ContentLoader>
);

export default Skeleton;
