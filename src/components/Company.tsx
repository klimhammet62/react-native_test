import {Dispatch, SetStateAction} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TCompany} from '../types/companyService';
import {Loader} from '../ui/Loader';

export const Company = ({
  company,
  isLoading,
  setTextValue,
}: {
  company: TCompany;
  isLoading: boolean;
  setTextValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <TouchableOpacity
          style={{
            alignItems: 'center',
            width: '100%',
            flexDirection: 'row',
          }}
          onPress={() => setTextValue(company.name)}>
          <Image
            style={styles.logo}
            source={{
              uri: `${company.logo}`,
            }}
          />
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginLeft: 14,
            }}>
            <Text style={{color: '#000000', fontSize: 14}}>{company.name}</Text>
            <Text style={{fontSize: 12, color: '#9F9F9F'}}>
              {company.domain}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  logo: {
    height: 54,
    width: 54,
    marginLeft: 16,
  },
});
