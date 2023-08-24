import React from 'react';
import { NextSeo } from 'next-seo';


const SEO = () => {
    return (
        <NextSeo
            title="Simple Usage Example"
            description="A short description goes here."
            canonical=''
            titleTemplate='%s'
            additionalMetaTags={[
                {
                    name: 'keywords',
                    content: 'SSG,Next'
                },
                {
                    name: `facebook-domain-verification`,
                    content: 'sjsj29802-03020-2idj'
                }
            ]}
            noindex={false}
            nofollow={true}
            facebook={{
                // check whether `facebook-domain-verification` is needed or not
                appId: 'sjsj29802-03020-2idj'
            }}
            robotsProps={{
                maxImagePreview: 'large'
            }}
            openGraph={{
                title: 'og:title',
                description: 'og:description',
                type: 'og:type',
                images: [{
                    url: 'https://www.sprinklr.com/spr-burst-500.png'
                }],
                url: `https://www.sprinklr.com`,
            }}
            twitter={{
                handle: '@handle',
                site: '@site',
                cardType: 'summary_large_image',
            }}
        />
    )
}

export default SEO