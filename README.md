# 🌍 Подорожники

**Подорожники** — багатосторінковий веб-додаток для збереження, перегляду та керування історіями подорожей.

Проєкт реалізований як fullstack-рішення з окремим фронтендом та бекендом.

---

## 🚀 Live Demo

- 🔗 Frontend: https://fullstack-120-project-frontend.vercel.app
- 🔗 Backend API: https://fullstack-120-project-group-1-backend.onrender.com
- 📘 Swagger: https://fullstack-120-project-group-1-backend.onrender.com/api-docs

---

## 📌 Опис проєкту

Подорожники — це адаптивний багатосторінковий сайт (десктоп / планшет / мобільна версія), який дозволяє:

- Переглядати історії інших користувачів
- Створювати власні історії
- Редагувати свої історії
- Додавати історії до збережених
- Переглядати популярні історії
- Фільтрувати історії за категоріями частин світу
- Переглядати список користувачів
- Переглядати історії конкретного користувача
- Керувати власним профілем

---

## 🛠 Технології

### 🎨 Frontend

- Next.js 16
- React 19
- TypeScript
- Axios
- TanStack React Query
- Zustand
- Formik
- Yup
- CSS Modules

### ⚙ Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (авторизація)
- Celebrate / Joi (валідація)
- Swagger

### ☁ Деплой

- Frontend: Vercel
- Backend: Render

---

## 🔐 Авторизація

- Реєстрація користувача
- Логін
- Logout
- JWT access + refresh token
- Захищені маршрути
- Авторизація через cookies

---

## 📂 Основний функціонал

### 📖 Історії

- Створення історії
- Редагування власної історії
- Видалення історії
- Перегляд всіх історій
- Пагінація
- Сортування за популярністю (кількість збережень)
- Фільтрація за категоріями
- Перегляд історій конкретного користувача

### ⭐ Збережені історії

- Додавання до збережених
- Видалення із збережених
- Перегляд власних збережених історій

### 👤 Користувачі

- Список користувачів
- Перегляд профілю користувача
- Перегляд історій користувача

---

## 🧩 Структура проєкту

Проєкт складається з двох окремих репозиторіїв:

### Frontend Repository

- Next.js App Router
- components/
- app/
- lib/
- types/

### Backend Repository

- routes/
- controllers/
- models/
- middleware/
- db/

---

## ⚙ Локальний запуск

### 1️⃣ Backend

```bash
git clone <backend-repo>
cd backend
npm install
```

#### Створити .env файл:

```bash
PORT=3000
MONGO_URL=your_mongodb_connection
JWT_SECRET=your_secret
REFRESH_SECRET=your_refresh_secret
```

#### Запуск:

```bash
npm run dev
```

### 2️⃣ Frontend

```bash
git clone <frontend-repo>
cd frontend
npm install
```

#### Створити .env.local:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_ORIGIN=http://localhost:3000
```

#### Запуск:

```bash
npm run dev
```

---

### 📱 Адаптивність

Сайт адаптований під:

- 🖥 Desktop
- 📱 Tablet
- 📲 Mobile

### 📊 API Документація

Проєкт має Swagger-документацію:
/api-docs

### 🧠 Архітектурні рішення

- Розділення frontend / backend
- REST API
- JWT авторизація через cookies
- Server API layer в Next.js
- Client API layer через Axios
- Global state management через Zustand
- Data fetching та кешування через React Query

### 👨‍💻 Команда

Проєкт реалізований як fullstack розробка (frontend + backend).

### 📌 Майбутні покращення

- Лайки
- Коментарі
- Пошук історій
- Завантаження декількох зображень
- Role-based доступ
