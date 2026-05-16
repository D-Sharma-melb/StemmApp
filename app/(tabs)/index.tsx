import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { 
  AppButton, 
  AppInput, 
  ScreenContainer, 
  AppHeader, 
  CardContainer, 
  ActivityCard, 
  ResultCard, 
  ScoreDisplay, 
  TimerDisplay, 
  SensorDataCard, 
  LeaderboardCard, 
  LoadingSpinner, 
  EmptyState, 
  MediaUploadButton, 
  CommentBox, 
  RatingStars, 
  MapPreview 
} from '../../components/shared/index';

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <AppHeader title="Component Showcase" rightIcon="settings-outline" onRightPress={() => {}} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Buttons</Text>
          <AppButton title="Primary Button" onPress={() => {}} />
          <View style={{ height: 10 }} />
          <AppButton title="Secondary Button" variant="secondary" onPress={() => {}} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Inputs & Forms</Text>
          <AppInput placeholder="Email Address..." />
          <View style={{ height: 10 }} />
          <CommentBox placeholder="What did you learn today?" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity & Cards</Text>
          <ActivityCard 
            title="Morning Yoga" 
            description="Start your day with a refreshing yoga session." 
            iconName="sunny-outline" 
            accentColor="#FF8A65" 
            onStart={() => {}} 
          />
          <CardContainer>
            <Text style={{ fontFamily: 'Poppins_500Medium' }}>Custom Card Container Content</Text>
          </CardContainer>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scores & Results</Text>
          <ResultCard score={950} summary="Great job completing the task!" />
          <View style={{ height: 20 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <ScoreDisplay score="400" color="#4DB6AC" />
            <TimerDisplay time="02:45" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sensors & Data</Text>
          <SensorDataCard icon="pulse-outline" label="Heart Rate" value="78 bpm" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Leaderboard</Text>
          <LeaderboardCard rank={1} teamName="Tech Titans" score={1200} />
          <LeaderboardCard rank={2} teamName="Science Squad" score={1100} />
          <LeaderboardCard rank={3} teamName="Math Magicians" score={1050} />
          <LeaderboardCard rank={4} teamName="Biology Buffs" score={900} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Media & Uploads</Text>
          <MediaUploadButton onPress={() => {}} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Map Preview</Text>
          <MapPreview />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Feedback & Ratings</Text>
          <RatingStars onRating={(res) => console.log('Rating:', res)} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>States</Text>
          <LoadingSpinner text="Connecting to sensors..." />
          <View style={{ height: 20 }} />
          <EmptyState icon="planet-outline" message="No experiments found yet. Try exploring!" />
        </View>

      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#3E3E3E',
    marginBottom: 12,
  }
});
