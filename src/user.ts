import { renderBlock } from './lib.js'

export class User {
  username: string
  avatarUrl: string

  constructor(username: string, avatarUrl: string) {
    this.username = username
    this.avatarUrl = avatarUrl
  }
}

export function getUserData():User {
  const currentUser:unknown = JSON.parse(localStorage.getItem('User'));
  if(currentUser instanceof User)
    return { username: currentUser.username, avatarUrl: currentUser.avatarUrl }
  else {
    const newUser = new User('Sahstiva', '/img/av.png');
    localStorage.setItem('User', JSON.stringify(newUser));
    return newUser;
  }
}

export function renderUserBlock (favoriteItemsAmount:number, userName = 'Wade Warren', userAvatar = './img/avatar.png') {
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет';
  const hasFavoriteItems = !!favoriteItemsAmount;

  console.log(favoriteItemsAmount);
  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${ userAvatar }" alt="${ userName }" />
      <div class="info">
          <p class="name">${ userName }</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
