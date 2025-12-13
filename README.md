# 🚀 Crypto Dash

A modern **React-based cryptocurrency dashboard** that fetches real-time market data from CoinGecko and allows users to **filter, sort, and limit** results dynamically.

Built with performance, clarity, and scalability in mind.

---

## ✨ Features

* 📊 **Live crypto market data** (CoinGecko API)
* 🔍 **Filter coins** by name or symbol
* ↕️ **Sort coins** by:

    * Market cap
    * Price
    * 24h percentage change
* 🔢 **Limit results** (5, 10, 20, 50, 100)
* ⚡ Fast, responsive UI
* 🧠 Clean state management with React Hooks
* 🛡️ Safe handling of loading & error states

---

## 🛠️ Technologies Used

### Frontend

* **React** (Functional Components)
* **React Hooks**

    * `useState`
    * `useEffect`
* **JSX**

### Tooling & Build

* **Vite** – fast modern frontend build tool
* **ES Modules**
* **Environment variables** via `import.meta.env`

### API

* **CoinGecko API**

    * Real-time cryptocurrency market data
    * No authentication required

### Styling

* **CSS** (custom styles)
* Component-based UI structure

---

## 🧩 Component Architecture

```
src/
├── components/
│   ├── CoinCard.jsx       # Displays individual coin data
│   ├── FilterInput.jsx    # Text input for filtering coins
│   ├── LimitSelector.jsx  # Controls number of coins shown
│   ├── SortSelect.jsx     # Sorting options
│
├── App.jsx                # Main application logic
```

Each component is:

* **Reusable**
* **Controlled**
* **Stateless where possible**

---

## ⚙️ How It Works

1. Fetches crypto data from CoinGecko
2. Stores results in React state
3. Applies:

    * filtering
    * sorting
    * limiting
4. Renders a responsive grid of coins

All data transformations are done **immutably** to avoid state mutation bugs.

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/robson-muniz/crypto-dash.git
cd crypto-dash
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variable

Create a `.env` file:

```env
VITE_API_URL=https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd
```

### 4️⃣ Run the app

```bash
npm run dev
```

---

## 📌 Future Improvements

* Pagination
* Skeleton loaders
* URL state syncing (`?sort=price_desc`)
* LocalStorage persistence
* Performance optimization with `useMemo`
* Dark / Light theme toggle

---

## 👨‍💻 Author

**Robson Muniz**
React-focused Front-End Developer
📍 Europe
💡 Passionate about clean UI, performance, and real-world applications

---

## 📄 License

This project is open source and available under the **MIT License**.

