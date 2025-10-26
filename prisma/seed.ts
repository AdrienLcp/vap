import { PrismaClient, type ProductStatus } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  { name: 'Category 1' },
  { name: 'Category 2' },
  { name: 'Category 3' },
  { name: 'Category 4' },
  { name: 'Category 5' },
  { name: 'Category 6' },
  { name: 'Category 7' },
  { name: 'Category 8' },
  { name: 'Category 9' },
  { name: 'Category 10' }
]

type Product = {
  name: string
  price: number
  sku: string
  stock: number
  status: ProductStatus
}

const products: Product[] = [
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
  for (const category of categories) {
    await prisma.category.create({ data: category })
  }

  const createdCategories = await prisma.category.findMany()

  for (const product of products) {
    const randomCategory = createdCategories[Math.floor(Math.random() * createdCategories.length)]

    await prisma.product.create({
      data: {
        categoryId: randomCategory.id,
        name: product.name,
        price: product.price,
        sku: product.sku,
        status: product.status,
        stock: product.stock
      }
    })
  }
}

const executeSeed = async () => {
  try {
    await seed()
  } catch (error) {
    console.error('Error during seeding:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

executeSeed()
