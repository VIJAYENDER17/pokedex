🛡️ Pokédex Explorer App
A modern, high-performance Pokémon encyclopedia built with React and React Router. This application provides a seamless experience for searching, filtering, and exploring the vast world of Pokémon using the PokéAPI.

🚀 Features Implemented
1. Pokémon Listing & Pagination
Dynamic Data Fetching: Retrieves a list of Pokémon with images, names, and types.

Pagination System: Navigation between pages (20 Pokémon per page) with "Prev" and "Next" controls.

Performance Optimization: Uses React.memo for the PokemonCard component to prevent unnecessary re-renders.

2. Comprehensive Search & Filter 
Live Search: Real-time filtering by Pokémon name as the user types.

Type Filtering: Advanced dropdown to filter Pokémon by specific types (Fire, Water, Dragon, etc.) fetched directly from the API.

Cross-Page Navigation: Clickable type badges on the Details page that redirect to the Search page with the filter auto-applied.

3. Detailed Views 
Individual Details: Dedicated pages for each Pokémon showing official artwork, base stats, height, and weight.

Ability Integration: A dedicated "Ability Details" page that displays the effect description and lists other Pokémon sharing that same ability.

4. Professional UI/UX
Glassmorphism Design: High-end UI with blurred backgrounds, consistent spacing, and gold accents.

Custom Pokeball Loader: A themed CSS-based animation for data fetching states.


🛠️ APIs Used
GET https://pokeapi.co/api/v2/pokemon: To list Pokémon for the main page.

GET https://pokeapi.co/api/v2/pokemon/{name|id}: To fetch specific stats and details.

GET https://pokeapi.co/api/v2/type: To populate the search filter.

GET https://pokeapi.co/api/v2/ability/{name}: To retrieve ability descriptions.

📂 Folder Structure
The project follows a modular component-based architecture for clean code and maintainability:

Plaintext
src/
├── components/
│   ├── AbilityDetails/    # Module 5: Ability info & mini-grid
│   ├── Navigation/        # Navbar with NavLink active states
│   ├── PokemonCard/       # Reusable card (Memoized for performance)
│   ├── PokemonDetails/    # Full stats, types, and abilities
│   ├── PokemonList/       # Main listing logic and pagination
│   └── Search/            # Search & Filter integration
├── App.jsx                # Main Routing setup
├── main.jsx               # Entry point
└── index.css              # Global styles (reset & theme)
📸 Screenshots
Home Page - Grid View
<img width="1902" height="976" alt="image" src="https://github.com/user-attachments/assets/f288af22-4160-4bdd-81f8-4f6e910b6279" />



Detailed Pokémon Stats
<img width="1899" height="924" alt="image" src="https://github.com/user-attachments/assets/e2527564-b4de-4602-858e-3bed7cf691cb" />


Advanced Search & Filter
<img width="1919" height="919" alt="image" src="https://github.com/user-attachments/assets/13ecb078-6ed2-442b-a59b-acafe363a4cc" />


🏗️ How to Run
Clone the repository.

Run npm install to install dependencies.

Run npm run dev to start the development server.
