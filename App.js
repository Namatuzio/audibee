import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Pressable, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Checkbox from 'expo-checkbox';
import { profiles } from './Matches.js';
import { ProfileCreation } from './ProfileCreation.js';
import bee from './img/bee.png';



function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
      <Text style={styles.titleFont}> Audibee </Text>
      <Image source={bee} style={styles.beeImg}></Image>
      <StatusBar style="auto" />
      </View>
      <View>
        <TextInput style={styles.loginInput} placeholder="Email" />
        <TextInput style={styles.loginInput} placeholder="Password" />
        <Pressable style={styles.btnFace} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>
      </View>
      <View style={styles.createAccountView}>
        <Text> Don't have an account?{' '}<Text style={styles.linkFont}onPress={() => navigation.navigate('SignUp')}>Make one here!</Text></Text>
      </View>
    </View>
  );
}

function SignUp({ navigation }) {
  return (
    <SafeAreaView style={styles.signUpContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleFont}> Audibee </Text>
        <Image source={bee} style={styles.beeImg}></Image>
        <StatusBar style="auto" />
      </View>
      <View>
        <TextInput style={styles.signUpInput} placeholder="Email" />
        <TextInput style={styles.signUpInput} placeholder="Password" />
        <TextInput style={styles.signUpInput} placeholder="Confirm Password" />
        <Text style={styles.sectionalPadding}> About Me </Text>
        <SafeAreaView style={styles.signUpInterestSectionStyle}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.interestSectionStyle}>
              <Checkbox value={true} />
              <Text style={styles.signUpInterestItemFont}> Music </Text>
              <Checkbox value={true}/>
              <Text style={styles.signUpInterestItemFont}> Sports </Text>
              <Checkbox value={true} />
              <Text style={styles.signUpInterestItemFont}> Cooking </Text>
            </View>
            <View style={styles.interestSectionStyle}>
              <Checkbox value={true} />
              <Text style={styles.signUpInterestItemFont}> Art </Text>
              <Checkbox value={true} />
              <Text style={styles.signUpInterestItemFont}> Dancing </Text>
              <Checkbox value={true} />
              <Text style={styles.signUpInterestItemFont}> Reading </Text>
            </View>
            <View style={styles.interestSectionStyle}>
              <Checkbox value={true} />
              <Text style={styles.signUpInterestItemFont}> Movies </Text>
              <Checkbox value={true} />
              <Text style={styles.signUpInterestItemFont}> Gaming </Text>
              <Checkbox value={true} />
              <Text style={styles.signUpInterestItemFont}> Podcasts </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
        <Pressable
          style={styles.btnFace}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

/*
Special coloring
    color: "#64D152",
    textShadowColor: "#FF00A8",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5
*/
function HomeTabs() {
  return (
    <Tab.Navigator
      style={{
        backgroundColor: "#000000",
      }}
    >
      <Tab.Screen
        name="Home Page"
        component={Home}
        options={{
          title: " Home ",
          headerStyle: {
            backgroundColor: "#ADEFA2",
          },
          headerTitleStyle: {
            color: "#64D152",
            textShadowColor: "#FF00A8",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 5,
          },
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            color: "#FF00A8",
            fontWeight: "bold",
          },
          tabBarIcon: ({ size }) => (
            <Ionicons name="home" color="#FF00A8" size={size} />
          ),
          tabBarStyle: {
            backgroundColor: "#90EE90",
            height: 60,
          },
        }}
      />
      <Tab.Screen
        name="Matches"
        component={Matches}
        options={{
          title: " Matches ",
          headerStyle: {
            backgroundColor: "#ADEFA2",
          },
          headerTitleStyle: {
            color: "#64D152",
            textShadowColor: "#FF00A8",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 5,
          },
          tabBarLabel: "Matches",
          tabBarLabelStyle: {
            color: "#FF00A8",
            fontWeight: "bold",
          },
          tabBarIcon: ({ size }) => (
            <Ionicons name="heart" color="#FF00A8" size={size} />
          ),
          tabBarStyle: {
            backgroundColor: "#90EE90",
            height: 60,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: " Profile ",
          headerStyle: {
            backgroundColor: "#ADEFA2",
          },
          headerTitleStyle: {
            color: "#64D152",
            textShadowColor: "#FF00A8",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 5,
          },
          tabBarLabel: "Profile",
          tabBarLabelStyle: {
            color: "#FF00A8",
            fontWeight: "bold",
          },
          tabBarIcon: ({ size }) => (
            <Ionicons name="person" color="#FF00A8" size={size} />
          ),
          tabBarStyle: {
            backgroundColor: "#90EE90",
            height: 60,
          },
        }}
      />
    </Tab.Navigator>
  );
}

//find a random number from 0 - 7
function randomNum() {
  const randomNum = Math.floor(Math.random() * 8);
  return randomNum;
}

function Home() {
  const [sound, setSound] = React.useState();
  const [profile, setProfile] = React.useState(() => profiles[randomNum()]);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('./assets/sounds/valentina.mp3'));
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();

    sound.getStatusAsync()
    .then(function(result) {
      console.log(result.positionMillis)
    })
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={styles.userContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.userNameFont}>{profile.name}</Text>
        <Text style={styles.itemPadding}> She/Her </Text>

        <Ionicons name="volume-high-outline" size={48} color="black" style={styles.soundBar} onPress={playSound}/>
        <Text style={styles.itemPadding}> 0:00 / 0:09 </Text>

        <View style={styles.userContainer}>
        <Text style={styles.sectionalPadding }> Interests </Text>

        <View style={styles.interestSectionStyle}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
            {profile.interests.map((interest) => (
                <Text style={styles.interestItemStyle} key={interest}>{interest}</Text>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.sectionalPadding }> About Me </Text>
        <SafeAreaView style={styles.sContainer}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
              sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Text>
          </ScrollView>
        </SafeAreaView>
        </View>

        <View style={styles.matchChoiceSection}>
        <Pressable style={styles.btnMatchFace} onPress={() => setProfile(profiles[randomNum()])}>
          <Ionicons name="close" style={styles.btnMatchText}/>
        </Pressable>
        <Pressable style={styles.btnMatchFace} onPress={() => alert('Message Sent!')}>
        <Ionicons name="checkmark" style={styles.btnMatchText}/>
        </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Matches() {
  return (
    <View style={styles.matchesContainer}>
      <SafeAreaView style={styles.matchesSection}>
      <View style={styles.matchStyling}>
          <Text style={styles.matchUserNameFont}> Valentina </Text>
          <Ionicons name="arrow-forward" size={24} style={styles.btnMatchText}/>
        </View>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
              sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Text>
          </ScrollView>
        </SafeAreaView>
        <SafeAreaView style={styles.matchesSection}>
        <View style={styles.matchStyling}>
          <Text style={styles.matchUserNameFont}> Holly </Text>
          <Ionicons name="arrow-forward" size={24} style={styles.btnMatchText}/>
        </View>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
              sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Text>
          </ScrollView>
        </SafeAreaView>
        <SafeAreaView style={styles.matchesSection}>
        <View style={styles.matchStyling}>
          <Text style={styles.matchUserNameFont}> Olivia </Text>
          <Ionicons name="arrow-forward" size={24} style={styles.btnMatchText}/>
        </View>
          <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
              sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Text>
          </ScrollView>
        </SafeAreaView>
    </View>
  );
}

function Profile() {
  const [sound, setSound] = React.useState();
  const [profile, setProfile] = React.useState(() => ProfileCreation[0]);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('./assets/sounds/valentina.mp3'));
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();

    sound.getStatusAsync()
    .then(function(result) {
      console.log(result.positionMillis)
    })
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={styles.userContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.userNameFont}>Josh</Text>
        <Text style={styles.itemPaddingAlt}> He/Him </Text>

        <Ionicons name="volume-high-outline" size={48} color="black" style={styles.soundBarAlt} onPress={playSound}/>
        <Text style={styles.itemPaddingAlt}> 0:00 / 0:09 </Text>

        <View style={styles.userContainer}>
        <Text style={styles.sectionalPaddingAlt}> Interests </Text>

        <View style={styles.interestSectionStyle}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
            {profile.interests.map((interest) => (
                <Text style={styles.interestItemStyleAlt} key={interest}>{interest}</Text>
            ))}
          </ScrollView>
          <Ionicons name="add" size={18} style={styles.addInterest} onPress={() => alert('Add Interest')}/>
        </View>

        <Text style={styles.sectionalPaddingAlt}> About Me </Text>
        <SafeAreaView style={styles.sContainer}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            <Text style={styles.textAlt}>
              {/* {ProfileCreation[0].bio} */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
              sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
              est laborum.
            </Text>
          </ScrollView>
        </SafeAreaView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADEFA2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpContainer: {
    flex: 1,
    backgroundColor: '#ADEFA2',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  userContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  titleFont: {
    fontSize: 64,
    color: "#64D152",
    textShadowColor: "#FF00A8",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5
  },
  beeImg: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  btnFace: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF00A8',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 45,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#64D152',
  },
  createAccountView: {
    position: 'absolute',
    bottom: 25,
  },
  userNameFont: {
    fontSize: 48,
    paddingLeft: 10,
    color: "#64D152",
    textShadowColor: "#FF00A8",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5
  },
  itemPadding: {
    color: "#FF00A8",
    paddingLeft: 10,
  },
  itemPaddingAlt: {
    color: "#64D152",
    paddingLeft: 10,
  },
  soundBar: {
    color: "#FF00A8",
    alignItems: 'stretch',
    paddingTop: 30,
    paddingLeft: 10,
  },
  soundBarAlt: {
    color: "#64D152",
    alignItems: 'stretch',
    paddingTop: 30,
    paddingLeft: 10,
  },
  sectionalPadding: {
    color: "#FF00A8",
    paddingTop: 30,
    paddingLeft: 10,
  },
  sectionalPaddingAlt: {
    color: "#64D152",
    paddingTop: 30,
    paddingLeft: 10,
  },
  interestSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 10,
  },
  interestItemStyle: {
    color: "#64D152",
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 5,
    backgroundColor: '#FF00A8',
    borderRadius: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  interestItemStyleAlt: {
    color: "#FF00A8",
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 5,
    backgroundColor: '#64D152',
    borderRadius: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },

  sContainer: {
    flex: 1,
  },
  scrollView: {
    marginVertical: 5,
    marginHorizontal: 10,
    height: "auto",
    maxHeight: 300,
    backgroundColor: '#F2EAEA',
    borderRadius: 15,
  },
  scrollViewAlt: {
    marginVertical: 5,
    marginHorizontal: 10,
    height: "auto",
    maxHeight: 300,
    backgroundColor: '#F2EAEA',
    borderRadius: 15,
  },
  text: {
    fontSize: 24,
    margin: 10,
    color: "#FF00A8",
  },
  textAlt: {
    fontSize: 24,
    margin: 10,
    color: "#64D152",
  },

  matchChoiceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingTop: 5,
  },
  btnMatchFace: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF00A8',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 45,
    marginBottom: 15,
    marginRight: 10,
  },
  btnMatchText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#64D152',
  },

  matchesContainer: {
    flex: 1,
  },
  matchesSection: {
    marginVertical: 5,
    marginHorizontal: 10,
    height: 150,
    backgroundColor: '#F2EAEA',
    borderRadius: 15,
  },

  matchUserNameFont: {
    fontSize: 48,
    color: "#64D152",
    textShadowColor: "#FF00A8",
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5
  },

  matchStyling: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  addInterest: {
    color: "#FF00A8",
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    marginLeft: 5,
    backgroundColor: '#64D152',
    borderRadius: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  loginInput: {
    backgroundColor: '#ffffff',
    height: 40,
    margin: 6,
    borderWidth: 0.5,
    borderColor: '#FF00A8',
    paddingLeft: 10,
    marginRight: -45,
    marginLeft: -45,
  },
  signUpInput: {
    backgroundColor: '#ffffff',
    height: 40,
    margin: 6,
    borderWidth: 0.5,
    borderColor: '#FF00A8',
    paddingLeft: 10,
  },

  linkFont: {
    color: "blue",
    textDecorationLine: "underline",
  },

  scrollViewAlt: {
    marginVertical: 5,
    height: "auto",
    maxHeight: 300,
    backgroundColor: '#F2EAEA',
    borderRadius: 15,
  },

  signUpInterestSectionStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 5,
    paddingRight: 10,
  },
  signUpInterestItemStyle: {
    color: "#64D152",
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 5,
    backgroundColor: '#FF00A8',
    borderRadius: 10,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  signUpInterestItemFont: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF00A8',
    width: 100,
  },
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: " User Login ",
            headerStyle: {
              backgroundColor: "#ADEFA2",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#64D152",
              lineHeight: 64,
              textShadowColor: "#FF00A8",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 5,
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{
            title: " Home ",
            headerStyle: {
              backgroundColor: "#ADEFA2",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#64D152",
              fontSize: 24,
              justifyContent: "center",
              textShadowColor: "#FF00A8",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 5,
            },
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: " SignUp ",
            headerStyle: {
              backgroundColor: "#ADEFA2",
            },
            headerTitleStyle: {
              fontWeight: "bold",
              color: "#64D152",
              fontSize: 24,
              justifyContent: "center",
              textShadowColor: "#FF00A8",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 5,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}