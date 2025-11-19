export const translations = {
  uk: { 
    HEADER: 
    { BOTTON_REGISTRATION: 'Реєстрація',
      BOTTON_LOGIN: 'Логін',
      BOTTON_LOGOUT: 'Вихід',
      HELLO_TEXT: 'Привіт!',
      TAGLINE: 'Зберігай у Каракації, не в голові'
    },
    MAIN_BOTTON_PANEL:
    {
      CREATE: 'Створити предмет',
      SHOW_ITEMS: 'Предмети',
      SHOW_SALES: 'Продажі',
      CREATE_CATEGORY: 'Створити категорію'
    },
    HOME: 
    { WELCOME: 'Ласкаво просимо!',
      START: 'Почати',
      BOTTON_REGISTRATION: 'Реєстрація',
      BOTTON_LOGIN: 'Логін',
      GREETING_TEXT: 'Цей сайт допоможе вам легко керувати своїми речами та покупками. Створюйте товари, додавайте їхню вартiсть, зазначайте дати покупки i продажу, слiдкуйте за витратами та рахуйте прибуток. Все зiбрано в одному мiсцi, щоб вам було простiше планувати, аналiзувати i розумiти, куди йдуть грошi i що приносить дохiд. Використовуйте сервiс у своєму ритмi.'
    },
    ITEM_CREATE: {
      TITLE: 'Створити предмет',
      PLACEHOLDER_TITLE: 'Назва',
      PLACEHOLDER_DESC: 'Опис',
      PLACEHOLDER_PRICE: 'Ціна купівлі',
      CHOOSE_CATEGORY: 'Оберіть категорію',
      CHOOSE_FILE: 'Оберіть файл',
      PHOTO_UPLOADED: 'Фото завантажено',
      BUTTON_CREATE: 'Створити',
      ERROR_TITLE: 'Введіть назву!',
      ERROR_CATEGORY: 'Оберіть категорію!',
      ERROR_PRICE: 'Введіть корректную ціну!',
      ERROR_PHOTO: 'Спочатку завантажте фото!',
      ERROR_CREATE: 'Помилка створення!',
      SUCCESS: 'Айтем успішно створен!'
    },
    ITEM_CARD: {
      TITLE: 'Назва :',
      DESCRIPTION: 'Опис :',
      PRICE: 'Ціна :',
      STATE: 'Продано',
      BOTTON_SALE: 'Продати',
      BOTTON_DELETE: 'Видалити'
    },
    SALE_CARD: {
      TITLE: 'Назва :',
      PRICE: 'Ціна закупівлі :',
      PROFIT: 'Прибуток :',
      BOTTON_DELETE: 'Видалити'
    },
    PAGINATION: {
      PAGE: 'Сторінка'
    },
    CATEGORY_CREATE:{
      GREETINGS: 'Створити категорію',
      TITLE_EN: 'Назва EN',
      TITLE_UA: 'Назва UA',
      BOTTON_CREATE: 'Створити',
      LIST_CATEGORY: 'Категорії',
      BOTTON_DELETE: 'Видалити'
    }
  },
  en: { 
    HEADER:
    { BOTTON_REGISTRATION: 'Registration',
      BOTTON_LOGIN: 'Login',
      BOTTON_LOGOUT: 'Logout',
      HELLO_TEXT: 'Hello!',
      TAGLINE: 'Store it in Karakatsiya, not in your head'
    },
    MAIN_BOTTON_PANEL:
    {
      CREATE: 'Create item',
      SHOW_ITEMS: 'Items',
      SHOW_SALES: 'Sales',
      CREATE_CATEGORY: 'Create category'
    },
    HOME: 
    { WELCOME: 'Welcome!',
      START: 'Start',
      BOTTON_REGISTRATION: 'Registration',
      BOTTON_LOGIN: 'Login',
      GREETING_TEXT: 'This site helps you easily manage your items and purchases. Create products, add their cost, track purchase and sale dates, monitor expenses, and calculate profit. Everything is gathered in one place to make it easier for you to plan, analyze, and understand where your money goes and what brings you income. Use the service at your own pace.'
    },
    ITEM_CREATE: {
      TITLE: 'Create an item',
      PLACEHOLDER_TITLE: 'Name',
      PLACEHOLDER_DESC: 'Description',
      PLACEHOLDER_PRICE: 'Purchase price',
      CHOOSE_CATEGORY: 'Choose a category',
      CHOOSE_FILE: 'Select a file',
      PHOTO_UPLOADED: 'Photo uploaded',
      BUTTON_CREATE: 'Create',
      ERROR_TITLE: 'Enter a name!',
      ERROR_CATEGORY: 'Choose a category!',
      ERROR_PRICE: 'Enter the correct price!',
      ERROR_PHOTO: 'Upload a photo first!',
      ERROR_CREATE: 'Creation error!',
      SUCCESS: 'Item successfully created!'
    },
    ITEM_CARD: {
      TITLE: 'Title :',
      DESCRIPTION: 'Description :',
      PRICE: 'Price :',
      STATE: 'Sold',
      BOTTON_SALE: 'Sale',
      BOTTON_DELETE: 'Delete'
    },
    SALE_CARD: {
      TITLE: 'Title :',
      PRICE: 'Purchase price :',
      PROFIT: 'Profit :',
      BOTTON_DELETE: 'Delete'
    },
    PAGINATION: {
      PAGE: 'Page'
    },
    CATEGORY_CREATE:{
      GREETINGS: 'Create category',
      TITLE_EN: 'Title EN',
      TITLE_UA: 'Title UA',
      BOTTON_CREATE: 'Create',
      LIST_CATEGORY: 'List category',
      BOTTON_DELETE: 'Delete'
    }
    }
};

export type Lang = 'uk' | 'en';