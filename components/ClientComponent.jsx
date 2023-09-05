"use client";


import React from 'react';
import { useTranslations } from 'next-intl'

const ClientComponent = () => {
    const t = useTranslations();
    return (
        <div>
            {t('test')}
        </div>
    )
}

ClientComponent.displayName = "ClientComponent";

export default ClientComponent;