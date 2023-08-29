"use client";

import React from 'react'
import { templatesMap } from '.'

const TemplateRenderer = ({ templates }) => {
    return (
        <div>
            {templates && templates.map((template, idx) => {
                const Template = templatesMap[template.__typename];
                if (!Template) return null;
                return <Template key={idx} {...template} />
            })}
        </div>
    )
}

export default TemplateRenderer