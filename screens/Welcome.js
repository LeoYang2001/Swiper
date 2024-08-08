import { View, Text ,Button, TouchableOpacity } from 'react-native'
import React, { useEffect ,useState} from 'react'
import Animated, { withDecay } from 'react-native-reanimated';
import { useSharedValue , withSpring, withTiming, Easing, ReduceMotion} from 'react-native-reanimated';
import { iniCards, MyColors } from '../constants';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Welcome = ({navigation}) => {
  const [myCards, setMyCards] = useState([])

  useEffect(() => {
    
    console.log('loading firebase');
    loadCardsFromFirestore()
    
  }, [])
  
  const loadCardsFromFirestore = async () => {
    try {
      // Reference to the Firestore collection
      const cardsCollection = collection(db, "cards");
  
      // Get all documents from the collection
      const querySnapshot = await getDocs(cardsCollection);
  
      // Initialize myCards array to store the parsed card objects
      const myCards = [];
  
      // Loop through the documents and parse them into JavaScript objects
      querySnapshot.forEach((doc) => {
        // Extract data from each document and parse into JavaScript object
        const cardData = doc.data();
        // Add parsed object to myCards array
        myCards.push(cardData);
      });
      setIfRecievedData(true)
      setMyCards(myCards)
  
      console.log("Cards loaded from Firestore:", myCards);
    } catch (error) {
      console.error("Error loading cards from Firestore: ", error);
    }
  };
  
 


    const width = useSharedValue(30)
    const translateY = useSharedValue(-300);
    const [ifTouched, setIfTouched] = useState(false)
    const [ifRecievedData, setIfRecievedData] = useState(false)

     const animationChain = () => {
      if(!ifRecievedData) return
      if(ifTouched) return
      setIfTouched(true)
      handleExpand()
        setTimeout(()=>{
          navigation.replace("Main", { myCards });
        },1500)
    }


    const handleExpand = () => {
        width.value = withTiming(width.value + 1000, {
          duration: 1500,
      easing: Easing.bezier(0.22, 0.78, 0.48, 0.9),
      reduceMotion: ReduceMotion.System,
        });
    };
    const handleBouncing = () => {
      translateY.value = withSpring(translateY.value + 300,  {
        mass: 1,
        damping: 5,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 16.75,
        reduceMotion: ReduceMotion.System,
      });
    
    }

   
    
      useEffect(() => {
        setTimeout(()=>{
          handleBouncing()
         },10)
      }, [])
      
    
      
  return (
    <View className="w-full h-full justify-center p-2 items-center  relative">
      <TouchableOpacity onPress={animationChain}>
     <Animated.View
     className="rounded-full"
      style={[{
        width,
        height: width,
        backgroundColor: MyColors.mainColor,
      }, {transform: [{translateY}]}]}
    />
    </TouchableOpacity>
    
    </View>
  )
}

export default Welcome