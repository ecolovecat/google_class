import { Button } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotLoggedIn: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Button
            colorScheme="blue"
            variant="solid"
            onClick={() => navigate('/login')}
        >
            {t('labels.login')}
        </Button>
    );
};

export default NotLoggedIn;
