import React from 'react'

import PageCard from '../ui/pageCard'

const Auth: React.FC = () => {
    return (
        <PageCard
            caption='Secure authentication'
            icon={(
                <img src='/icons/AuthKeyIcon.svg' alt='' />
            )}
        >
            content...
        </PageCard>
    )
}

export default Auth