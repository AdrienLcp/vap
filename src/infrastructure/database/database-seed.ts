import { categories } from '@/features/category/infrastructure/category-schema'
import {
  type ProductStatus,
  products
} from '@/features/product/infrastructure/product-schema'
import { createScriptClient } from '@/infrastructure/database/database-script-client'

const { client, db } = createScriptClient()

const categoryNames = [
  'Category 1',
  'Category 2',
  'Category 3',
  'Category 4',
  'Category 5',
  'Category 6',
  'Category 7',
  'Category 8',
  'Category 9',
  'Category 10'
]

type SeedProduct = {
  name: string
  price: number
  sku: string
  status: ProductStatus
  stock: number
}

const seedProducts: SeedProduct[] = [
  { name: 'Product 1', price: 10, sku: '0', status: 'ACTIVE', stock: 10 },
  { name: 'Product 2', price: 10, sku: '1', status: 'ACTIVE', stock: 10 },
  { name: 'Product 3', price: 10, sku: '2', status: 'ACTIVE', stock: 10 },
  { name: 'Product 4', price: 10, sku: '3', status: 'ACTIVE', stock: 10 },
  { name: 'Product 5', price: 10, sku: '4', status: 'ACTIVE', stock: 10 },
  { name: 'Product 6', price: 10, sku: '5', status: 'ACTIVE', stock: 10 },
  { name: 'Product 7', price: 10, sku: '6', status: 'ACTIVE', stock: 10 },
  { name: 'Product 8', price: 10, sku: '7', status: 'ACTIVE', stock: 10 },
  { name: 'Product 9', price: 10, sku: '8', status: 'ACTIVE', stock: 10 },
  { name: 'Product 10', price: 10, sku: '9', status: 'ACTIVE', stock: 10 }
]

const seed = async () => {
  const insertedCategories = await db
    .insert(categories)
    .values(categoryNames.map((name) => ({ name })))
    .returning({ id: categories.id })

  if (insertedCategories.length === 0) {
    throw new Error('No categories were inserted')
  }

  for (const product of seedProducts) {
    const randomCategory =
      insertedCategories[Math.floor(Math.random() * insertedCategories.length)]

    if (!randomCategory) continue

    await db.insert(products).values({
      categoryId: randomCategory.id,
      name: product.name,
      price: product.price,
      sku: product.sku,
      status: product.status,
      stock: product.stock
    })
  }
}

const executeSeed = async () => {
  try {
    await seed()
    console.info('Seed completed successfully')
  } catch (error) {
    console.error('Error during seeding:', error)
    process.exitCode = 1
  } finally {
    await client.end()
  }
}

executeSeed()
