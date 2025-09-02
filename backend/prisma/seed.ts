import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // Create categories
  const menCategory = await prisma.category.create({
    data: {
      name: "Men",
      slug: "men",
    },
  })

  const womenCategory = await prisma.category.create({
    data: {
      name: "Women",
      slug: "women",
    },
  })

  const kidsCategory = await prisma.category.create({
    data: {
      name: "Kids",
      slug: "kids",
    },
  })

  // Create subcategories
  const menTshirts = await prisma.category.create({
    data: {
      name: "T-Shirts",
      slug: "men-tshirts",
      parentId: menCategory.id,
    },
  })

  const menJeans = await prisma.category.create({
    data: {
      name: "Jeans",
      slug: "men-jeans",
      parentId: menCategory.id,
    },
  })

  const womenTshirts = await prisma.category.create({
    data: {
      name: "T-Shirts",
      slug: "women-tshirts",
      parentId: womenCategory.id,
    },
  })

  const womenDresses = await prisma.category.create({
    data: {
      name: "Dresses",
      slug: "women-dresses",
      parentId: womenCategory.id,
    },
  })

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12)
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@ecommerce.com",
      passwordHash: adminPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  })

  // Create test customer
  const customerPassword = await bcrypt.hash("customer123", 12)
  const customerUser = await prisma.user.create({
    data: {
      email: "customer@example.com",
      passwordHash: customerPassword,
      name: "John Doe",
      role: "CUSTOMER",
    },
  })

  // Create sample products
  const products = [
    {
      title: "Classic White T-Shirt",
      slug: "classic-white-tshirt",
      description: "A comfortable, classic white t-shirt made from 100% cotton.",
      price: 19.99,
      sku: "MEN-TSH-001",
      inventory: 100,
      categoryId: menTshirts.id,
      images: ["/white-t-shirt.png"],
      defaultImage: "/white-t-shirt.png",
      attributes: {
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["White"],
        material: "100% Cotton",
      },
    },
    {
      title: "Slim Fit Jeans",
      slug: "slim-fit-jeans",
      description: "Modern slim fit jeans with stretch comfort.",
      price: 79.99,
      salePrice: 59.99,
      sku: "MEN-JEA-001",
      inventory: 50,
      categoryId: menJeans.id,
      images: ["/classic-blue-jeans.png"],
      defaultImage: "/classic-blue-jeans.png",
      attributes: {
        sizes: ["28", "30", "32", "34", "36"],
        colors: ["Dark Blue", "Light Blue"],
        fit: "Slim",
      },
    },
    {
      title: "Women's Cotton Tee",
      slug: "womens-cotton-tee",
      description: "Soft and comfortable cotton tee for everyday wear.",
      price: 24.99,
      sku: "WOM-TSH-001",
      inventory: 75,
      categoryId: womenTshirts.id,
      images: ["/woman-pink-tshirt.png"],
      defaultImage: "/woman-pink-tshirt.png",
      attributes: {
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Pink", "White", "Black"],
        material: "100% Cotton",
      },
    },
    {
      title: "Summer Floral Dress",
      slug: "summer-floral-dress",
      description: "Light and breezy floral dress perfect for summer.",
      price: 89.99,
      sku: "WOM-DRE-001",
      inventory: 30,
      categoryId: womenDresses.id,
      images: ["/floral-summer-dress.png"],
      defaultImage: "/floral-summer-dress.png",
      attributes: {
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Floral Print"],
        material: "Cotton Blend",
        occasion: "Casual",
      },
    },
    {
      title: "Basic Black T-Shirt",
      slug: "basic-black-tshirt",
      description: "Essential black t-shirt for your wardrobe.",
      price: 19.99,
      sku: "MEN-TSH-002",
      inventory: 120,
      categoryId: menTshirts.id,
      images: ["/black-t-shirt.png"],
      defaultImage: "/black-t-shirt.png",
      attributes: {
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Black"],
        material: "100% Cotton",
      },
    },
    {
      title: "Casual Button-Down Shirt",
      slug: "casual-button-down-shirt",
      description: "Versatile button-down shirt for work or casual wear.",
      price: 49.99,
      sku: "MEN-SHI-001",
      inventory: 60,
      categoryId: menCategory.id,
      images: ["/blue-button-shirt.png"],
      defaultImage: "/blue-button-shirt.png",
      attributes: {
        sizes: ["S", "M", "L", "XL"],
        colors: ["Light Blue", "White"],
        material: "Cotton Blend",
        fit: "Regular",
      },
    },
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }

  // Create sample address for customer
  await prisma.address.create({
    data: {
      userId: customerUser.id,
      firstName: "John",
      lastName: "Doe",
      addressLine1: "123 Main Street",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "US",
      phone: "+1-555-0123",
      isDefault: true,
    },
  })

  console.log("✅ Database seeded successfully!")
  console.log("👤 Admin user: admin@ecommerce.com / admin123")
  console.log("👤 Customer user: customer@example.com / customer123")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
