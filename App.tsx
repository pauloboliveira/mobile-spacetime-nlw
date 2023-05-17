import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import blurBg from './src/assets/luz.png'
import Stripes from './src/assets/stripes.svg'
import NLWLogo from './src/assets/logo-spacetime.svg'

const StyleStripes = styled(Stripes)

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { styled } from 'nativewind'

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

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

      <TouchableOpacity activeOpacity={0.7} className='rounded-full bg-green-500 px-5 py-3'>
        <Text className='font-alt text-sm uppercase text-black'>CADASTRAR LEMBRANÇA</Text>
      </TouchableOpacity>
    </View>

      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>Feito com 💜 no NLW da Rocketseat</Text>
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
