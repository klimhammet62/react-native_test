import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {MagnifySvg} from './assets/magnify';
import {TCompany} from './types/companyService';
import {useDebounce} from './hooks/useDebounce';
import 'react-native-get-random-values';
import {getCompanies} from './redux/companiesReducer';
import {useAppDispatch, useAppSelector} from './hooks/redux';
import {spin} from './ui/Loader';
import {CompaniesList} from './components/CompaniesList';
import {Company} from './components/Company';

const App = () => {
  const [textValue, setTextValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state: any) => state.companies.companies);

  const debouncedValue = useCallback(
    useDebounce((text: string) => {
      dispatch(getCompanies(text));
      setIsLoading(false);
    }, 800),
    [],
  );

  function handleChangeText(text: string) {
    setIsLoading(true);
    setTextValue(text);
    debouncedValue(text);
  }

  useEffect(() => {
    spin();
    getCompanies(textValue);
  }, [textValue]);

  const companiesSelector = (company: TCompany) => {
    return (
      <Company
        company={company}
        isLoading={isLoading}
        setTextValue={setTextValue}
      />
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.appWrapper}>
        <Text>Компания</Text>
        <View style={styles.formWrapper}>
          <View style={styles.inputWrapper}>
            <MagnifySvg style={styles.magnifySvg} />
            <TextInput
              selectionColor={'#000000'}
              cursorColor={'#000000'}
              onChangeText={handleChangeText}
              placeholder={'Enter company'}
              placeholderTextColor={'#E5E5E5'}
              style={styles.input}
              value={textValue}
            />
          </View>
          <CompaniesList
            selector={companiesSelector}
            isLoading={isLoading}
            companies={companies}
            textValue={textValue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 10,
  },
  formWrapper: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingBottom: 15,
    borderColor: '#E5E5E5',
    borderRadius: 6,
  },
  input: {
    flex: 1,
    width: '100%',
    height: '160%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 10,
    marginTop: 14,
    borderWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  magnifySvg: {
    fill: '#E5E5D5',
    padding: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    height: 25,
    width: 25,
    alignItems: 'flex-start',
    resizeMode: 'stretch',
  },
  hovered: {
    backgroundColor: 'grey',
  },
});

export default App;
