'use client'

import { PublicProductsDashboard } from '@/features/product/presentation/components/public-products-dashboard'

import './home-page.sass'
import { AddressClient } from '@/features/address/infrastructure/address-client'
import { Button } from '@/presentation/components/ui/pressables/button'

const test = async () => {
  const response = await AddressClient.updateUserAddress('cmi50zbes000104kvhjmp14lr')
  console.log(response)
}

export const HomePage: React.FC = async () => (
  <main className='home-main'>
    <PublicProductsDashboard />

    <Button onPress={test} variant='filled'>
      TEST
    </Button>
  </main>
)
