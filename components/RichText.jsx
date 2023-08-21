import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const document = {
    "data": {},
    "content": [
        {
            "data": {},
            "content": [
                {
                    "data": {},
                    "marks": [
                        {
                            "type": "bold"
                        }
                    ],
                    "value": "CX Connect: \n",
                    "nodeType": "text"
                },
                {
                    "data": {},
                    "marks": [
                        {
                            "type": "bold"
                        }
                    ],
                    "value": "viaggio nel futuro \ndella Customer Experience",
                    "nodeType": "text"
                }
            ],
            "nodeType": "heading-2"
        },
        {
            "data": {},
            "content": [
                {
                    "data": {},
                    "marks": [],
                    "value": "",
                    "nodeType": "text"
                }
            ],
            "nodeType": "paragraph"
        }
    ],
    "nodeType": "document"
};

const RichText = () => {
    return documentToReactComponents(document, {
        renderNode: {
            "heading-2": (_node, children) => <h2 style={{ color: 'red' }}>{children}</h2>
        }
    })
}

export default RichText;