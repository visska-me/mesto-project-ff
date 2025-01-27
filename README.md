# Проектная работа Mesto

Макет https://www.figma.com/design/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0-1

# Чек-лист

## Работа отклоняется от проверки

Пока эти проблемы не будут исправлены, ревьюер не примет работу на проверку и не даст обратную связь по всему проекту:

- При открытии `index.html` в консоли возникают ошибки.
- Часть функциональности не реализована.
- На повторных итерациях не исправлены критические замечания.
- Работа содержит вопросы или просьбы о помощи к ревьюеру.

## Критические требования

Без соблюдения этих требований ваш проект не пройдёт проверку, эти пункты обязательно попросит исправить ревьюер.

### Стиль написания кода

- Форматирование кода:
    - код проекта отформатирован единообразно;
    - нет нарушений иерархии отступов.
- Объявление переменных:
    - для объявления переменных используется `let` и `const`, не используется объявление через `var`;
    - если переменная не перезаписывает своё значение, она объявлена через `const`.
- Требования по именованию переменных:
    - имена переменных и функций написаны в стиле `camelCase`;
    - имена переменных — существительные, отражающие то, что в них хранится;
    - если в проекте есть несколько переменных с похожими данными — по их наименованиям понятно, что хранится в каждой переменной;
    - имена массивов — существительные во множественном числе;
    - имена функций начинаются с глагола, отражающего то, что они делают;
    - для именования не используется транслит и неуместные сокращения.

### Соответствие заданию

- Проект выполнен на основе предлагаемого стартеркита.
- При открытии страницы на неё добавляется 6 карточек с помощью JavaScript.
- Карточки отображаются согласно макету.
- Корректно реализовано создание карточки:
    - создание карточки из шаблона, подстановка в неё данных и навешивание на неё обработчиков событий описано в отдельной функции;
    - функция создания карточки принимает как параметры данные карточки и функцию, которая вызывается для обработки события удаления карточки;
    - для создания карточки используется `template`, описанный в `index.html`;
    - функция создания карточки возвращает DOM-элемент созданной карточки.
- При нажатии на кнопку удаления карточки, соответствующая карточка удаляется со страницы.
- Добавления карточек на страницу выполняется перебором массива с данными карточек с помощью цикла.

## Хорошие практики

В этом списке собраны приёмы, которые помогут сделать проект ещё лучше. На данном этапе их использовать необязательно — автотесты и ревьюер примут работу без них. Однако такие хорошие практики помогут вам сделать портфолио более профессиональным. Опытные разработчики обратят на них внимание.

- Для перебора элементов массива используется метод массива `.forEach`или цикл `for…of`.
- Все DOM-элементы, необходимые для реализации логики, вынесены в переменные.
- Для поиска DOM-элементов используется метод `querySelector`.
- Поиск одного и того же DOM-элемента не происходит дважды.
- Для вставки данных на страницу не используется свойство `innerHTML`.
- Операции над DOM-элементами выполняются до их вставки в разметку.
- Код логично организован, например сначала идет объявление переменных, затем объявление функций и в конце вызывается отображение данных на странице.
- Нет лишнего кода: переменных, которые не используются; закомментированных фрагментов, избыточной логики.
- Удалены все `console.log`, `alert` и `debugger`, которые используются во время отладки.

