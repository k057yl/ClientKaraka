import * as ukRegistration from './uk/registration.json';
import * as ukLogin from './uk/login.json';
import * as ukHeader from './uk/header.json';
import * as ukMainButtonPanel from './uk/main-button-panel.json';
import * as ukHome from './uk/home.json';
import * as ukItemCreate from './uk/item-create.json';
import * as ukItemCard from './uk/item-card.json';
import * as ukSaleCard from './uk/sale-card.json';
import * as ukPagination from './uk/pagination.json';
import * as ukCategoryCreate from './uk/category-create.json';
import * as ukFilterItem from './uk/filter-item.json';
import * as ukFilterSale from './uk/filter-sale.json';
import * as ukSharedMessage from './uk/shared-message.json';


import * as enRegistration from './en/registration.json';
import * as enLogin from './en/login.json';
import * as enHeader from './en/header.json';
import * as enMainButtonPanel from './en/main-button-panel.json';
import * as enHome from './en/home.json';
import * as enItemCreate from './en/item-create.json';
import * as enItemCard from './en/item-card.json';
import * as enSaleCard from './en/sale-card.json';
import * as enPagination from './en/pagination.json';
import * as enCategoryCreate from './en/category-create.json';
import * as enFilterItem from './en/filter-item.json';
import * as enFilterSale from './en/filter-sale.json';
import * as enSharedMessage from './en/shared-message.json';

export const translations = {
  uk: { 
    HEADER: ukHeader,
    REGISTRATION: ukRegistration,
    MAIN_BOTTON_PANEL: ukMainButtonPanel,
    HOME: ukHome,
    ITEM_CREATE: ukItemCreate,
    ITEM_CARD: ukItemCard,
    SALE_CARD: ukSaleCard,
    PAGINATION: ukPagination,
    CATEGORY_CREATE: ukCategoryCreate,
    FILTER_ITEM: ukFilterItem,
    FILTER_SALE: ukFilterSale,
    LOGIN: ukLogin,
    SHARED: ukSharedMessage
},
  en: { 
    HEADER: enHeader,
    REGISTRATION: enRegistration,
    MAIN_BOTTON_PANEL: enMainButtonPanel,
    HOME: enHome,
    ITEM_CREATE: enItemCreate,
    ITEM_CARD: enItemCard,
    SALE_CARD: enSaleCard,
    PAGINATION: enPagination,
    CATEGORY_CREATE: enCategoryCreate,
    FILTER_ITEM: enFilterItem,
    FILTER_SALE: enFilterSale,
    LOGIN: enLogin,
    SHARED: enSharedMessage
}
} as const;

export type Lang = keyof typeof translations;