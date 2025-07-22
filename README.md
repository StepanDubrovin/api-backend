# Api-Backend

## Описание

Разработать API-сервис, позволяющий клиентам просматривать номера в отеле, узнавать их доступность на определённый период, бронировать номера, отменять бронирование, а также фиксировать статус VIP-клиента. Система должна исключать возможность двойного бронирования одного и того же номера на пересекающиеся даты.

---

## Технологии

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

---

## Быстрый старт (через Docker)

### 1. Клонировать репозиторий

```bash
git clone https://github.com/StepanDubrovin/api-backend.git
cd api-backend
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Создать файл `.env` в корне проекта и заполнить переменные:

```env
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_DATABASE=api-backend
PORT=3000
```

### 4. Собрать и запустить контейнер

```bash
docker compose up --build
```

Приложение будет доступно по адресу: [http://localhost:3000](http://localhost:3000)

## Скрипты

```bash
npm run dev      # Запуск в режиме разработки
npm run build    # Сборка проекта
```
# Проверка

## 1. Создать бронирование через POST `/api/bookings`

**Обязательные поля:**

- `start_date` — дата начала бронирования (YYYY-MM-DD)  
- `end_date` — дата окончания бронирования (YYYY-MM-DD)  
- `status` — статус бронирования (1 — активна, 2 — отменена)  
- `user_id` — ID пользователя  
- `room_id` — ID номера  

**Пример запроса:**

```http
POST /api/booking
Content-Type: application/json

{
  "start_date": "2025-08-01",
  "end_date": "2025-08-05",
  "status": 1,
  "user_id": "01982eba-6c5f-763d-a0e1-1216b4f6e682",
  "room_id": "01982eba-6c54-758c-bdd2-8ddbbcf0a98a"
}
```

**Ожидаемый результат:**
Конфликт дат — HTTP 409 Conflict с сообщением об ошибке.

**При смене даты на 2025-07-01 - 2025-07-05**

**Ожидаемый результат:**
HTTP 201 Created и тело с данными новой брони, в том числе userRole - VIP - 2 CLIENT - 1.

## 2. Получить комнаты через GET `/api/rooms`

```http
GET /api/rooms
```

**Ожидаемый результат:**
HTTP 200 OK
JSON-массив с описаниями комнат.

## 3. Получить комнаты на определённые даты через GET `GET /api/rooms?

```http
GET /api/rooms?start_date=2025-08-01&end_date=2025-08-05
```

**Ожидаемый результат:**
HTTP 200 OK
JSON-массив номеров, свободных на указанный период.

## 4. Отмена бронирования через DELETE `/api/bookings/:booking_id`

```http
DELETE /api/booking/01983319-25e1-738a-8ae2-6ca1b78493ab
```

**Ожидаемый результат:**
HTTP 200 OK и подтверждение отмены брони.

