"use client";


import React from 'react';
import { useTranslations } from 'next-intl'

const Test = () => {
    const t = useTranslations();
    return (
        <div>
            {t('test')}
        </div>
    )
}

Test.displayName = "Test";

export default Test;