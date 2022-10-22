import {FlatList, Text, View, StyleSheet, Pressable} from 'react-native';
import {Loader} from '../ui/Loader';
import {TCompany} from '../types/companyService';
import {useAppDispatch} from '../hooks/redux';
import {nanoid} from 'nanoid';
import {useCallback} from 'react';
import {selectCompany} from '../redux/companiesReducer';

export const CompaniesList = ({
  isLoading,
  companies,
  textValue,
  selector,
}: {
  isLoading: boolean;
  companies: TCompany[];
  textValue: string;
  selector: any;
}) => {
  const dispatch = useAppDispatch();
  const keyExtractor = useCallback(() => nanoid(), []);

  return (
    <>
      {isLoading ? (
        <Loader />
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
                              backgroundColor: pressed ? '#E5E5E5' : 'white',
                            },
                          ]}
                          onPress={() => {
                            dispatch(selectCompany(item));
                          }}>
                          {selector(item)}
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
    </>
  );
};
const styles = StyleSheet.create({
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
});
