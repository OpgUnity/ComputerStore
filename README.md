Структура проекта:
---
Папка public содержит в себе веб-страничку, в котрой ренедерится всё содрежимое, её не трогаем.
***
Папка server содержит в себе серверную часть логики.

Название файла или папки  | Содержание файла
--------------------------|----------------------
controllers               | Контроллеры, которые общаются с базой данных (добавление, обновление, удаление и чтение)
routes                    | Тут лежат все маршруты в приложении
connection.js             | Код, отвечающий за подключение к базе
queryBuilder.js           | Построитель запросов, использовать его для генерации sql
utils.js                  | Всякие полезные ништяки, которые можно использовать сразу в нескольких контроллерах
***
Папка src содержит в себе код клиентской части (сайта с табличками)
***
Папка test содержит в себе тесты для jest
***
Папка Отчёт нужна для отправки туда кусочков отчёта по заданиям
***
Файл package.json описывает пакеты.
Для установки приложения необходимо выполнить в директории проекта команду npm install, а затем запустить сервер и клиентскую часть командами

      npm start и npm run start-server.