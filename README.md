## Запуск серверной части

1. Установите зависимости проекта:
   ```
   npm install
   ```

2. Создайте базу данных с именем `library`.

3. Основной адрес API: [http://localhost:8000](http://localhost:8000).

### Маршруты для работы с библиотекой

- **GET** - Получить список всех книг в библиотеке:  
  [http://localhost:8000/library](http://localhost:8000/library)

- **POST** - Добавить новую книгу в библиотеку:  
  [http://localhost:8000/library](http://localhost:8000/library)

- **PUT** - Обновить информацию о книге в библиотеке по ID:  
  [http://localhost:8000/library/:id](http://localhost:8000/library/:id)

- **DELETE** - Удалить книгу из библиотеки по ID:  
  [http://localhost:8000/library/:id](http://localhost:8000/library/:id)

- **POST** - Поиск книги в библиотеке по ключевому слову:  
  [http://localhost:8000/library/find](http://localhost:8000/library/find)

  Тело запроса должно содержать поле `searchKeyword`.

### Маршруты для работы с пользователями

- **POST** - Регистрация нового пользователя:  
  [http://localhost:8000/users](http://localhost:8000/users)

- **POST** - Вход пользователя в систему (авторизация):  
  [http://localhost:8000/users/sessions](http://localhost:8000/users/sessions)

  В ответе будет выдан токен авторизации.

- **POST** - Выход пользователя из системы (разлогин):  
  [http://localhost:8000/users/logout](http://localhost:8000/users/logout)

  Токен должен быть отправлен в заголовке запроса под названием `Authorization`.

### Генерация фикстур

Для генерации фикстур запустите команду:
```
npm run dev
```

### Поля для базы данных

#### Библиотека (`library`)

- **id**: номер книги в библиотеке (число)
- **name**: название книги (строка)
- **author**: автор книги (строка)
- **publishYear**: год издания книги (число)
- **description**: описание книги (строка)

#### Пользователь (`User`)

- **id**: уникальный идентификатор пользователя (число)
- **username**: имя пользователя (строка)
- **password**: пароль пользователя (строка)
- **token**: токен авторизации пользователя (строка)

### Создатели

Этот проект создан Лябаевым Адильханом.

### Лицензия

