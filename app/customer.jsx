import { View, Image } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { Link } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation  } from 'expo-router';


function TopView() {
    return (
        <View style={{margin:40, flexDirection: 'row', backgroundColor: "#e4e7d1"}}>
            <Image 
                style={{height: 80, width: 350, marginLeft: 15, marginTop: 10}}
                source={{uri: "/Users/evandarrenchristanto/Downloads/splitrr.jpeg"}}/>
        </View>
    )
}

export default function HomePage() {
    const [text, setText] = useState('');
    const [error, setError] = useState(null);
    const [restId, setRestId] = useState('')
    const [temp, setTemp] = useState('');
    const [pass, setPass] = useState([])
    


    const handleOk =  async () => {
        if (text == '' || restId == '') {
            setError("Please insert a valid number!")
            // eslint-disable-next-line no-undef
            alert(error);
        } else {
            const final = JSON.parse(await AsyncStorage.getItem(restId))
            setPass(final)
            console.log(pass)

            // eslint-disable-next-line no-undef
            alert("Data has been saved succesfullly!")
        }

        
    }

    const inputRestId = async () => {
        try {
            await AsyncStorage.setItem('restId', restId)
        } catch (error) {
            setError(error)
        }
    }

    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#e4e7d1"}}>
            <TopView />
            <Text style={{fontWeight: 'bold', fontSize: 17, color:'#394d46'}}>How many people are there?</Text>
            <TextInput value={text} 
                        onChangeText={setText} 
                        style={{backgroundColor: '#e4e7d1'}}
                        activeUnderlineColor="#394d46"/>
            <Text style={{fontWeight: 'bold', fontSize: 17, color:'#394d46', marginTop: 20}}>Input restaurant ID?</Text>
            <TextInput value={restId} 
                        onChangeText={setRestId} 
                        style={{backgroundColor: '#e4e7d1'}}
                        activeUnderlineColor="#394d46"/>
            <Button mode="contained" 
                    style={{marginTop: 40, marginBottom: 10}} 
                    onPress={inputRestId} 
                    buttonColor="#394d46"> 
                OK 
            </Button>
            <Link href="/menuchoose">
                <Button mode="contained" 
                        buttonColor="#394d46">Next</Button>
            </Link>
            <Button onPress={() => 
                supabase.auth.signOut()} mode='contained' buttonColor="#ff6961" style={{marginTop: 20}}>Logout</Button>

        </View>
    );
    
}

