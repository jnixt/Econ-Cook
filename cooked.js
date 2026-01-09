// Recipe Data
const recipes = [
  {
    id: 1,
    name: "Creamy Garlic Pasta",
    description: "A rich and indulgent pasta dish with a velvety garlic cream sauce",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80",
    time: "25 min",
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Fettuccine", amount: "400g", image: "https://cdn-icons-png.flaticon.com/128/3480/3480618.png" },
      { name: "Garlic", amount: "6 cloves", image: "https://cdn-icons-png.flaticon.com/128/5346/5346072.png" },
      { name: "Heavy Cream", amount: "2 cups", image: "https://cdn-icons-png.flaticon.com/128/3050/3050158.png" },
      { name: "Parmesan", amount: "1 cup", image: "https://cdn-icons-png.flaticon.com/128/517/517561.png" },
      { name: "Butter", amount: "4 tbsp", image: "https://cdn-icons-png.flaticon.com/128/5778/5778223.png" },
      { name: "Fresh Parsley", amount: "¼ cup", image: "https://cdn-icons-png.flaticon.com/128/2909/2909841.png" }
    ],
    steps: [
      "Cook fettuccine according to package directions until al dente. Reserve 1 cup of pasta water before draining.",
      "While pasta cooks, mince the garlic finely. Melt butter in a large skillet over medium heat.",
      "Add minced garlic to the butter and sauté for 1-2 minutes until fragrant but not browned.",
      "Pour in the heavy cream and bring to a gentle simmer. Cook for 5 minutes, stirring occasionally.",
      "Reduce heat to low and stir in the grated Parmesan cheese until melted and smooth.",
      "Add the drained pasta to the sauce, tossing to coat. Add pasta water if needed for consistency.",
      "Season with salt and pepper, garnish with fresh parsley, and serve immediately."
    ]
  },
  {
    id: 2,
    name: "Honey Glazed Salmon",
    description: "Perfectly seared salmon with a sweet and savory honey glaze",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    time: "20 min",
    servings: 2,
    difficulty: "Medium",
    ingredients: [
      { name: "Salmon Fillets", amount: "2 pieces", image: "https://cdn-icons-png.flaticon.com/128/1915/1915361.png" },
      { name: "Honey", amount: "3 tbsp", image: "https://cdn-icons-png.flaticon.com/128/3050/3050295.png" },
      { name: "Soy Sauce", amount: "2 tbsp", image: "https://cdn-icons-png.flaticon.com/128/2553/2553642.png" },
      { name: "Lemon", amount: "1 whole", image: "https://cdn-icons-png.flaticon.com/128/590/590772.png" },
      { name: "Garlic", amount: "3 cloves", image: "https://cdn-icons-png.flaticon.com/128/5346/5346072.png" },
      { name: "Olive Oil", amount: "2 tbsp", image: "https://cdn-icons-png.flaticon.com/128/5778/5778160.png" }
    ],
    steps: [
      "Pat salmon fillets dry with paper towels and season both sides with salt and pepper.",
      "Mix honey, soy sauce, minced garlic, and juice of half the lemon in a small bowl.",
      "Heat olive oil in a skillet over medium-high heat until shimmering.",
      "Place salmon skin-side up and sear for 4 minutes until golden brown.",
      "Flip salmon and pour the honey mixture over the fillets.",
      "Cook for another 4-5 minutes, basting with the glaze, until salmon is cooked through.",
      "Serve with remaining lemon wedges and drizzle with pan sauce."
    ]
  },
  {
    id: 3,
    name: "Garden Fresh Salad",
    description: "A vibrant mix of seasonal vegetables with a zesty vinaigrette",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    time: "15 min",
    servings: 4,
    difficulty: "Easy",
    ingredients: [
      { name: "Mixed Greens", amount: "6 cups", image: "https://cdn-icons-png.flaticon.com/128/2909/2909769.png" },
      { name: "Cherry Tomatoes", amount: "1 cup", image: "https://cdn-icons-png.flaticon.com/128/1202/1202125.png" },
      { name: "Cucumber", amount: "1 medium", image: "https://cdn-icons-png.flaticon.com/128/2909/2909808.png" },
      { name: "Red Onion", amount: "½ small", image: "https://cdn-icons-png.flaticon.com/128/1652/1652077.png" },
      { name: "Feta Cheese", amount: "½ cup", image: "https://cdn-icons-png.flaticon.com/128/517/517561.png" },
      { name: "Olive Oil", amount: "¼ cup", image: "https://cdn-icons-png.flaticon.com/128/5778/5778160.png" }
    ],
    steps: [
      "Wash and dry all vegetables thoroughly. Tear greens into bite-sized pieces.",
      "Halve the cherry tomatoes and slice cucumber into thin rounds.",
      "Thinly slice red onion and separate into rings.",
      "Whisk together olive oil, red wine vinegar, Dijon mustard, salt, and pepper for the dressing.",
      "Combine all vegetables in a large bowl.",
      "Crumble feta cheese over the top.",
      "Drizzle with dressing and toss gently just before serving."
    ]
  },
  {
    id: 4,
    name: "Classic Beef Tacos",
    description: "Seasoned ground beef tacos with fresh toppings and homemade salsa",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
    time: "30 min",
    servings: 6,
    difficulty: "Easy",
    ingredients: [
      { name: "Ground Beef", amount: "500g", image: "https://cdn-icons-png.flaticon.com/128/3143/3143626.png" },
      { name: "Taco Shells", amount: "12 pieces", image: "https://cdn-icons-png.flaticon.com/128/5787/5787016.png" },
      { name: "Tomatoes", amount: "2 large", image: "https://cdn-icons-png.flaticon.com/128/1202/1202125.png" },
      { name: "Lettuce", amount: "1 head", image: "https://cdn-icons-png.flaticon.com/128/2909/2909769.png" },
      { name: "Cheddar", amount: "1 cup", image: "https://cdn-icons-png.flaticon.com/128/517/517561.png" },
      { name: "Sour Cream", amount: "½ cup", image: "https://cdn-icons-png.flaticon.com/128/3050/3050158.png" }
    ],
    steps: [
      "Brown the ground beef in a large skillet over medium-high heat, breaking it up as it cooks.",
      "Drain excess fat and add taco seasoning with a splash of water. Simmer for 5 minutes.",
      "Warm taco shells according to package directions.",
      "Dice tomatoes, shred lettuce, and grate the cheddar cheese.",
      "Spoon seasoned beef into each taco shell.",
      "Top with lettuce, tomatoes, cheese, and a dollop of sour cream.",
      "Serve immediately with lime wedges and your favorite hot sauce."
    ]
  },
  {
    id: 5,
    name: "Chocolate Lava Cake",
    description: "Decadent individual cakes with a molten chocolate center",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
    time: "25 min",
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Dark Chocolate", amount: "200g", image: "https://cdn-icons-png.flaticon.com/128/3020/3020054.png" },
      { name: "Butter", amount: "100g", image: "https://cdn-icons-png.flaticon.com/128/5778/5778223.png" },
      { name: "Eggs", amount: "4 large", image: "https://cdn-icons-png.flaticon.com/128/1147/1147809.png" },
      { name: "Sugar", amount: "100g", image: "https://cdn-icons-png.flaticon.com/128/3050/3050101.png" },
      { name: "Flour", amount: "50g", image: "https://cdn-icons-png.flaticon.com/128/3014/3014128.png" },
      { name: "Vanilla", amount: "1 tsp", image: "https://cdn-icons-png.flaticon.com/128/3050/3050295.png" }
    ],
    steps: [
      "Preheat oven to 425°F (220°C). Butter and lightly flour four 6-oz ramekins.",
      "Melt chocolate and butter together in a double boiler, stirring until smooth.",
      "In a separate bowl, whisk eggs, sugar, and vanilla until light and fluffy.",
      "Fold the melted chocolate into the egg mixture until combined.",
      "Gently fold in the flour until just incorporated. Don't overmix.",
      "Divide batter evenly among prepared ramekins.",
      "Bake for 12-14 minutes until edges are firm but center is soft. Let rest 1 minute, then invert onto plates."
    ]
  },
  {
    id: 6,
    name: "Thai Green Curry",
    description: "Aromatic coconut curry with vegetables and fragrant Thai basil",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
    time: "35 min",
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { name: "Coconut Milk", amount: "400ml", image: "https://cdn-icons-png.flaticon.com/128/3050/3050158.png" },
      { name: "Green Curry Paste", amount: "3 tbsp", image: "https://cdn-icons-png.flaticon.com/128/2553/2553642.png" },
      { name: "Chicken Breast", amount: "400g", image: "https://cdn-icons-png.flaticon.com/128/3143/3143643.png" },
      { name: "Bell Peppers", amount: "2 mixed", image: "https://cdn-icons-png.flaticon.com/128/2909/2909821.png" },
      { name: "Bamboo Shoots", amount: "1 can", image: "https://cdn-icons-png.flaticon.com/128/2909/2909841.png" },
      { name: "Thai Basil", amount: "1 cup", image: "https://cdn-icons-png.flaticon.com/128/2909/2909841.png" }
    ],
    steps: [
      "Slice chicken breast into thin strips. Cut bell peppers into strips.",
      "Heat 2 tablespoons of coconut cream in a wok over medium-high heat.",
      "Add green curry paste and fry for 1 minute until fragrant.",
      "Add chicken and stir-fry until almost cooked through, about 5 minutes.",
      "Pour in remaining coconut milk and bring to a simmer.",
      "Add bell peppers and bamboo shoots. Cook for 5-7 minutes until vegetables are tender.",
      "Stir in Thai basil, season with fish sauce and palm sugar. Serve over jasmine rice."
    ]
  }
];

// DOM Elements
const recipeGrid = document.getElementById('recipe-grid');
const modal = document.getElementById('recipe-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

// Render Recipe Cards
function renderRecipeCards() {
  recipeGrid.innerHTML = recipes.map(recipe => `
    <article class="recipe-card" data-id="${recipe.id}">
      <div class="recipe-card-image">
        <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
      </div>
      <div class="recipe-card-content">
        <h3>${recipe.name}</h3>
        <p>${recipe.description}</p>
        <div class="recipe-meta">
          <span>⏱️ ${recipe.time}</span>
          <span>👥 ${recipe.servings} servings</span>
          <span>📊 ${recipe.difficulty}</span>
        </div>
      </div>
    </article>
  `).join('');

  // Add click listeners
  document.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => {
      const recipeId = parseInt(card.dataset.id);
      openRecipeModal(recipeId);
    });
  });
}

// Open Recipe Modal
function openRecipeModal(recipeId) {
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  modalBody.innerHTML = `
    <div class="modal-hero">
      <img src="${recipe.image}" alt="${recipe.name}">
    </div>
    <div class="modal-details">
      <h2>${recipe.name}</h2>
      <p class="modal-description">${recipe.description}</p>
      
      <div class="modal-info">
        <div class="modal-info-item">
          <strong>${recipe.time}</strong>
          <span>Cook Time</span>
        </div>
        <div class="modal-info-item">
          <strong>${recipe.servings}</strong>
          <span>Servings</span>
        </div>
        <div class="modal-info-item">
          <strong>${recipe.difficulty}</strong>
          <span>Difficulty</span>
        </div>
      </div>

      <div class="ingredients-section">
        <h3>🥘 Ingredients</h3>
        <div class="ingredients-grid">
          ${recipe.ingredients.map(ing => `
            <div class="ingredient-card">
              <img src="${ing.image}" alt="${ing.name}">
              <div class="name">${ing.name}</div>
              <div class="amount">${ing.amount}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="steps-section">
        <h3>👨‍🍳 Instructions</h3>
        ${recipe.steps.map((step, index) => `
          <div class="step">
            <div class="step-number">${index + 1}</div>
            <div class="step-content">
              <p>${step}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Initialize
renderRecipeCards();
