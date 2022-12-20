# Octoberfest 2023 project on Angular

Этот проект выполнен в качестве тестового задания в компанию Норси Транс. Также является моим первым знакомством с Angular.

## Запуск проекта

### Проект можно открыть и потыкать по [ссылке](https://erik770.github.io/Octoberfest-angular-app/#/)

### Либо же запустить его локально при помощи команд

`git clone https://github.com/erik770/test-task-intern-ozon-fintech.git`

`cd ./norsi-trans-beerfest`

`npm ci && npm run start`

Затем в браузере открыть [http://localhost:4200](http://localhost:4200) с проектом

## ТЗ можно найти по ссылке

## Некоторые замечания и комментарии к выполненному заданию

- Пришлось при деплое перейти на [HashLocationStrategy](https://angular.io/api/common/HashLocationStrategy) тк насколько я понял сервак на GithubPages нельзя настроить например при помощи .htaccess файла, нашел [решение](https://stackoverflow.com/questions/47513604/deploy-angular-website-on-github-products-404-error/47513767) проблемы только в переходе на хеш-стратегию

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
