import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';


const DEFAULT_INSET_INLINE_END = 100;
const PADDING = 8;

const FloatingImage = ({
    image,
    sx,
}) => {
    const [el, setEl] = useState();
    const [insetInlineEnd, setInsetInlineEnd] = useState(
        DEFAULT_INSET_INLINE_END,
    );
    const { width } = useWindowSize();

    const isPageRTL = true;

    useEffect(() => {
        if (el) {
            const { left, right } = el.getBoundingClientRect();
            setInsetInlineEnd(
                Math.min(
                    DEFAULT_INSET_INLINE_END,
                    isPageRTL ? width - right - PADDING : left - PADDING,
                ),
            );
        }
    }, [width, el]);

    return (
        <div ref={setEl} className={`relative ${sx}`}>
            <div
                className={`absolute inset-0 h-full top-0 inset-${insetInlineEnd}`}
            >
                <Image
                    className="object-scale-down h-full w-full rounded-16"
                    src={image?.file?.url}
                    height={image?.file?.details?.image?.height}
                    width={image?.file?.details?.image?.width}
                    altTitle={image.title ?? image.description}
                    loader={({ src, width, quality }) => {
                        return src + "?w=" + width;
                    }}
                />
            </div>
        </div>
    );
};


export default FloatingImage;