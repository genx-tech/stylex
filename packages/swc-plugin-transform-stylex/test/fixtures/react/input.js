import React from 'react';
import stylex from '@genx/stylex';

function Block(props) {
    const {
        row,
        reverse,
        flex,
        center,
        middle,
        top,
        bottom,
        right,
        left,
        space,
        full,
        fluid,
        height,
        width,
        children,
        className,
        style,
        ..._props
    } = {
        row: false,
        reverse: false,
        flex: false,
        center: false,
        middle: false,
        top: false,
        bottom: false,
        right: false,
        left: false,
        vspace: null,
        hspace: null,
        full: false,
        fluid: false,
        height: null,
        width: null,
        ...props,
    };

    const styleBlock = [
        styles.root,
        reverse ? styles.blockReverse : styles.block,
        row && (reverse ? styles.rowReverse : styles.row),
        center && (row ? styles.alongCenter : styles.crossCenter),
        middle && (row ? styles.crossCenter : styles.alongCenter),
        top && (row ? styles.crossStart : styles.alongStart),
        bottom && (row ? styles.crossEnd : styles.alongEnd),
        right && (row ? styles.alongEnd : styles.crossEnd),
        left && (row ? styles.alongStart : styles.crossStart),
        full && styles.full,
        fluid && styles.fluid,
        className,
    ];

    _props.style = stylex.inline(
        flex ? { flex: flex === true ? 1 : flex } : null,
        space != null && { justifyContent: `space-${space}` },
        height != null && { height },
        width != null && { width },
        style
    );

    return (
        <div className={stylex(styleBlock)} {..._props}>
            {children}
        </div>
    );
}

const styles = stylex.create({
    root: {
        display: 'flex',
    },
    block: {
        flexDirection: 'column',
    },
    blockReverse: {
        flexDirection: 'column-reverse',
    },
    row: {
        flexDirection: 'row',
    },
    rowReverse: {
        flexDirection: 'row-reverse',
    },
    crossCenter: {
        alignItems: 'center',
    },
    alongCenter: {
        justifyContent: 'center',
    },
    crossStart: {
        alignItems: 'flex-start',
    },
    crossEnd: {
        alignItems: 'flex-end',
    },
    alongStart: {
        justifyContent: 'flex-start',
    },
    alongEnd: {
        justifyContent: 'flex-end',
    },
    full: {
        width: '100%',
        height: '100%',
    },
    fluid: {
        width: 'auto',
    },
});

export default Block;
