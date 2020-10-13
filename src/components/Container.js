import React from 'react';

const Container = (props) => {
    const {
        content
    } = props;

    return(
        <main>
            {content}
        </main>
    )
} 

export default Container;