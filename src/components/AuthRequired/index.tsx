'use client';

import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Screens } from '../../navigation/appNavigation';
import { storage } from '../../storage';
import { StorageKeys } from '@src/constants';

interface AuthRequiredProps {
  children: React.ReactNode;
  screenName: string;
}

const AuthRequired: React.FC<AuthRequiredProps> = ({
  children,
  screenName,
}) => {
  const navigation = useNavigation() as any;
  const token = storage.get(StorageKeys.TOKEN);
  const route = useRoute();

  React.useEffect(() => {
    if (!token) {
      navigation.navigate(Screens.LOGIN, {
        redirectTo: screenName,
        redirectParams: route.params,
      });
    }
  }, [token, navigation, screenName, route.params]);

  return token ? <>{children}</> : null;
};

export default AuthRequired;
