import { renderSearchFormBlock } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { renderUserBlock } from './user.js'
import { renderToast } from './lib.js'
import {DateTime} from 'luxon';

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(0, 'Sahstiva', '/img/av.png');
  renderSearchFormBlock();
  renderSearchStubBlock();
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  );
  document.getElementById('findButton').addEventListener('click', ev => {
    // ev.preventDefault();
    const checkIn = DateTime.fromISO((document.getElementById('check-in-date') as HTMLInputElement).value).setLocale('ru');
    const checkOut = DateTime.fromISO((document.getElementById('check-out-date') as HTMLInputElement).value).setLocale('ru');
    renderSearchFormBlock(checkIn, checkOut);
    renderToast(
      {text: `Выбраны даты c ${checkIn.toLocaleString(DateTime.DATE_MED)} по ${checkOut.toLocaleString(DateTime.DATE_MED)}`, type: 'success'},
      {name: 'Хорошо', handler: () => {console.log('Уведомление закрыто')}}
    );
  });
});

