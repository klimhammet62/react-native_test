import React, {useCallback, useEffect, useState} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {MagnifySvg} from './assets/magnify';
import {CircleExample} from './assets/circle';
import {TCompany} from './types/companyService';
import {useDebounce} from './hooks/useDebounce';
import 'react-native-get-random-values';
import {nanoid} from 'nanoid';
import {getCompanies, selectCompany} from './redux/companiesReducer';
import {useAppDispatch, useAppSelector} from './hooks/redux';

const App = () => {
  const [textValue, setTextValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state: any) => state.companies.companies);
  const company = useAppSelector((state: any) => state.companies.company);
  const keyExtractor = useCallback(() => nanoid(), []);
  const spinValue = new Animated.Value(0);

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 700,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  const debouncedValue = useCallback(
    useDebounce((text: string) => {
      dispatch(getCompanies(text));
    }, 800),
    [],
  );

  function handleChangeText(text: string) {
    setIsLoading(true);
    setTextValue(text);
    debouncedValue(text);
    setIsLoading(false);
  }

  useEffect(() => {
    getCompanies(textValue);
  }, [textValue]);

  const companiesSelector = (company: TCompany) => {
    return (
      <>
        {isLoading ? (
          <View style={{marginTop: 50}}>
            <Animated.View style={{transform: [{rotate}]}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <CircleExample style={styles.loaderSvg} />
              </View>
            </Animated.View>
          </View>
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
              <Text style={{color: '#000000', fontSize: 14}}>
                {company.name}
              </Text>
              <Text style={{fontSize: 12, color: '#9F9F9F'}}>
                {company.domain}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  useEffect(() => {
    spin();
  }, []);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.appWrapper}>
        <Text>Компания</Text>
        <View style={styles.formWrapper}>
          {/* <MagnifySvg style={styles.magnifySvg} /> */}
          <TextInput
            selectionColor={'#000000'}
            cursorColor={'#000000'}
            onChangeText={handleChangeText}
            placeholder={'Enter company'}
            placeholderTextColor={'#E5E5E5'}
            style={styles.input}
            value={textValue}
          />
          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Animated.View style={{transform: [{rotate}]}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <CircleExample style={styles.loaderSvg} />
                </View>
              </Animated.View>
            </View>
          ) : (
            <>
              {textValue && companies.length ? (
                <View style={[styles.dataCard, styles.elevation]}>
                  <FlatList
                    data={companies}
                    keyExtractor={keyExtractor}
                    renderItem={({item}) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 15,
                          }}>
                          <View
                            style={{
                              flexShrink: 1,
                              width: '100%',
                            }}>
                            <Pressable
                              style={({pressed}) => [
                                {
                                  opacity: pressed ? 0.5 : 1,
                                  backgroundColor: pressed
                                    ? '#E5E5E5'
                                    : 'white',
                                },
                              ]}
                              onPress={() => {
                                dispatch(selectCompany(item));
                              }}>
                              {companiesSelector(item)}
                            </Pressable>
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>
              ) : (
                <Text>Not found</Text>
              )}
            </>
          )}
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
  input: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 6,
    padding: 10,
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
    resizeMode: 'stretch',
  },
  loaderSvg: {
    fill: '#E5E5D5',
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  logo: {
    height: 54,
    width: 54,
    marginLeft: 16,
  },
  dataCard: {
    width: '100%',
    borderBottomWidth: 1.2,
    borderLeftWidth: 1.2,
    borderRightWidth: 1.2,
    borderColor: '#E5E5E5',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: 'white',
  },
  elevation: {
    shadowColor: '#000',
    elevation: 12,
  },
  hovered: {
    backgroundColor: 'grey',
  },
});

export default App;
