import fs from 'fs';

// Функція для генерації випадкового числа в діапазоні
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функція для генерації випадкових дат
const generateRandomDate = () => {
  const date = new Date(2021, getRandomInt(0, 11), getRandomInt(1, 28), getRandomInt(0, 23), getRandomInt(0, 59));
  return date.toLocaleString('uk-UA', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Функція для генерації коментарів
const generateComments = (productId) => {
  const comments = [];
  const commentCount = getRandomInt(1, 3); // 1-3 коментарі на продукт

  for (let i = 0; i < commentCount; i++) {
    comments.push({
      id: comments.length + 1,
      productId: productId,
      description: ["Really cool", "Nice gadget!", "Love it!"][getRandomInt(1, 3) - 1],
      date: generateRandomDate()
    });
  }

  return comments;
};

// Генерація продуктів
const generateProductsWithComments = (productCount) => {
  const products = [];

  for (let i = 1; i <= productCount; i++) {
    const product = {
      id: i,
      imageUrl: `./src/assets/product.webp`,
      name: `Product name ${i}`,
      count: getRandomInt(1, 10),
      size: {
        width: getRandomInt(100, 300),
        height: getRandomInt(100, 300)
      },
      weight: `${getRandomInt(100, 500)}g`,
      comments: generateComments(i) // Генерація коментарів для кожного продукту
    };

    products.push(product);
  }

  return products;
};

// Генерація 30 одиниць продуктів
const products = generateProductsWithComments(30);

// Запис у файл db.json
fs.writeFileSync('db.json', JSON.stringify({ products }, null, 2));

console.log('Дані успішно згенеровані і записані в db.json');
