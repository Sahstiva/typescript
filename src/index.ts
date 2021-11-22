import { renderSearchFormBlock, searchHandler } from './search-form.js'
import { renderSearchStubBlock } from './search-results.js'
import { User, renderUserBlock, getUserData } from './user.js'
import { renderToast } from './lib.js'
import { DateTime } from 'luxon';

window.addEventListener('DOMContentLoaded', () => {
  const currentUser:User = getUserData();
  renderUserBlock(0, currentUser.username, currentUser.avatarUrl);
  renderSearchFormBlock();
  renderSearchStubBlock();
  renderToast(
    {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
    {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  );
  document.getElementById('findButton').addEventListener('click', searchHandler);
});

