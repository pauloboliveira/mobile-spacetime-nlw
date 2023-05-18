import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import blurBg from '../src/assets/luz.png'
import Stripes from '../src/assets/stripes.svg'
import NLWLogo from '../src/assets/logo-spacetime.svg'
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";

const StyleStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/39a604c86682b3b249e9',
};
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { styled } from 'nativewind'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import { useEffect } from 'react'
import { api } from '../src/lib/api'

export default function App() {
 const router = useRouter()

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  
    const [request, response, signIn] = useAuthRequest(
      {
        clientId: '39a604c86682b3b249e9',
        scopes: ['identity'],
        redirectUri: makeRedirectUri({
          scheme: 'spacetime'
        }),
      },
      discovery
    );

      async function handleGithubOAuthCode(code: string) {
       const response = await
       api.post('/register', {
        code,
      })
        
      const {token} = response.data;

      await SecureStore.setItemAsync('token', token)

      router.push('/memories')
   }

    useEffect(() => {
      if (response?.type === 'success') {
        const { code } = response.params;
        
        handleGithubOAuthCode(code)
      }
    }, [response]);

  if(!hasLoadedFonts) {
    return null;
  }

  return (
    <ImageBackground source={blurBg} className="relative px-8 py-10 flex-1 items-center bg-gray-900" imageStyle={{position: 'absolute', left: '-100%'}}>
      <StyleStripes className='absolute left-2'/>

    <View className='flex-1 items-center justify-center gap-6'>
      <NLWLogo />
      <View className='space-y-2'>
        <Text className='text-center font-title text-2xl leading-tight text-gray-50'>Sua cápsula do tempo</Text>
        <Text className='text-center font-body text-base leading-relaxed text-gray-100'>Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!</Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} className='rounded-full bg-green-500 px-5 py-3' onPress={() => signIn()}>
        <Text className='font-alt text-sm uppercase text-black'>CADASTRAR LEMBRANÇA</Text>
      </TouchableOpacity>
    </View>

      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>Feito com 💜 no NLW da Rocketseat</Text>
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
