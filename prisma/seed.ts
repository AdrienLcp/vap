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
  { name: 'Product 1', price: 10, sku: '0', stock: 10, status: 'ACTIVE' },
  { name: 'Product 2', price: 10, sku: '1', stock: 10, status: 'ACTIVE' },
  { name: 'Product 3', price: 10, sku: '2', stock: 10, status: 'ACTIVE' },
  { name: 'Product 4', price: 10, sku: '3', stock: 10, status: 'ACTIVE' },
  { name: 'Product 5', price: 10, sku: '4', stock: 10, status: 'ACTIVE' },
  { name: 'Product 6', price: 10, sku: '5', stock: 10, status: 'ACTIVE' },
  { name: 'Product 7', price: 10, sku: '6', stock: 10, status: 'ACTIVE' },
  { name: 'Product 8', price: 10, sku: '7', stock: 10, status: 'ACTIVE' },
  { name: 'Product 9', price: 10, sku: '8', stock: 10, status: 'ACTIVE' },
  { name: 'Product 10', price: 10, sku: '9', stock: 10, status: 'ACTIVE' }
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
        name: product.name,
        price: product.price,
        sku: product.sku,
        stock: product.stock,
        status: product.status,
        categoryId: randomCategory.id
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
