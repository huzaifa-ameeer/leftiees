import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not set. Add it to your .env file.");
  process.exit(1);
}

function pexels(id) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop`;
}

const products = [
  {
    name: "512 Slim Taper Jeans",
    brand: "Levi's",
    waists: [30, 32, 34, 36],
    description:
      "A modern slim-taper cut with a streamlined leg that narrows below the knee. Cut from mid-weight stretch denim with a clean indigo wash.",
    price: 2100,
    oldPrice: 2800,
    stock: 12,
    featured: true,
    images: [pexels("10133274"), pexels("10133275"), pexels("10133278")],
  },
  {
    name: "Mid-Rise Skinny Jeans",
    brand: "Guess",
    waists: [30, 32, 34],
    description:
      "A high-recovery skinny fit that hugs from hip to ankle without losing shape, finished in a deep saturated blue.",
    price: 3200,
    stock: 8,
    featured: true,
    images: [pexels("1082526"), pexels("4109757"), pexels("17720474")],
  },
  {
    name: "Straight Fit Denim",
    brand: "Mustang",
    waists: [32, 34, 36, 38],
    description:
      "Everyday straight-leg denim with a comfortable mid-rise and a classic five-pocket build in a soft, broken-in wash.",
    price: 1850,
    oldPrice: 2400,
    stock: 15,
    featured: true,
    images: [pexels("4109755"), pexels("2129970"), pexels("4049757")],
  },
  {
    name: "Texas Slim Jeans",
    brand: "Wrangler",
    waists: [34, 36, 38, 40],
    description:
      "A slim silhouette with a touch of stretch for movement, built on durable denim with authentic Western roots.",
    price: 2600,
    stock: 10,
    featured: true,
    images: [pexels("17265364"), pexels("16390573"), pexels("16069736")],
  },
  {
    name: "Slim Fit Dark Wash",
    brand: "Diesel",
    waists: [36, 38, 40, 42],
    description:
      "A refined slim fit in a dark resin-coated wash for a sharper look, with structured denim and clean detailing.",
    price: 3600,
    oldPrice: 4200,
    stock: 6,
    featured: true,
    images: [pexels("6764142"), pexels("6764133"), pexels("30298204")],
  },
  {
    name: "Classic Regular Fit",
    brand: "Lee",
    waists: [38, 40, 42, 44],
    description:
      "A timeless regular fit that sits comfortably at the waist with a straight leg — rugged, honest denim made to last.",
    price: 1600,
    stock: 20,
    featured: true,
    images: [pexels("14840593"), pexels("36195132"), pexels("34851014")],
  },
];

const client = new MongoClient(MONGO_URI);

async function main() {
  await client.connect();
  const collection = client.db("leftiees").collection("products");

  const count = await collection.countDocuments();
  if (count > 0) {
    console.log(`Products already exist (${count}). Skipping seed.`);
    return;
  }

  const now = new Date();
  await collection.insertMany(
    products.map((product) => ({
      ...product,
      createdAt: now,
      updatedAt: now,
    })),
  );
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => client.close());
