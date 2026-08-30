import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';

import { colors } from '../theme/colors';
import { RootStackParamList } from '../types';
import { useZikirDB } from '../hooks/useZikirDB';
import ZikirListItem from '../components/ZikirList/ZikirListItem';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Zikirlerim'>;
};

const ZikirlerimScreen: React.FC<Props> = ({ navigation }) => {
  const { zikirler, loading, deleteZikir, refresh } = useZikirDB();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', refresh);
    return unsubscribe;
  }, [navigation, refresh]);

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textOnDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Zikirlerim</Text>
        <TouchableOpacity style={styles.infoBtn}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={colors.textOnDark}
          />
        </TouchableOpacity>
      </View>

      {/* Sarı banner */}
      <TouchableOpacity style={styles.banner} activeOpacity={0.85}>
        <Text style={styles.bannerText}>Diğer Uygulamalarımız</Text>
      </TouchableOpacity>

      {/* Liste */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primaryMid} />
        </View>
      ) : zikirler.length === 0 ? (
        <View style={styles.centered}>
          <Ionicons name="list-outline" size={64} color={colors.border} />
          <Text style={styles.emptyText}>Henüz kayıt yok</Text>
          <Text style={styles.emptySubtext}>
            Ana ekrandan KAYDET butonuna basarak zikir kaydedebilirsiniz.
          </Text>
        </View>
      ) : (
        <FlatList
          data={zikirler}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ZikirListItem item={item} onDelete={deleteZikir} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: colors.textOnDark,
    marginLeft: 8,
  },
  infoBtn: {
    padding: 4,
  },
  banner: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  bannerText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textOnAccent,
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ZikirlerimScreen;
