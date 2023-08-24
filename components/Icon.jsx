import Image from 'next/image'
import React from 'react'

const Icon = ({ icon, title, height, width }) => {
    const iconPath = `/static/icons/${icon}.svg`
    return (
        <Image
            src={icon}
            alt={title}
            width={height}
            height={width}
            loader={() => iconPath}
        />
    )
}

export default Icon