import {renderBlock, renderToast} from './lib.js';
import { DateTime } from 'luxon';

export interface iSearchFormData {
  city: string
  startDate: DateTime
  endDate: DateTime
  maxPrice: number
}
export interface iPlace {

}

export function searchHandler(event) {
  event.preventDefault();
  const city = (document.getElementById('city') as HTMLInputElement).value;
  const checkIn = DateTime.fromISO((document.getElementById('check-in-date') as HTMLInputElement).value).setLocale('ru');
  const checkOut = DateTime.fromISO((document.getElementById('check-out-date') as HTMLInputElement).value).setLocale('ru');
  const maxPrice = parseFloat((document.getElementById('max-price') as HTMLInputElement).value);
  search({
    city: city,
    startDate: checkIn,
    endDate: checkOut,
    maxPrice: maxPrice
  },
  (error?:Error, places?:iPlace) => {
    if (error == null && places != null) {
      console.log('Success!')
    } else {
      console.error('Fail', error)
    }
  }
  );
}

export function search(data: iSearchFormData, callback: (error?: Error, places?: iPlace[]) => void):void {
  console.log(data);
  renderSearchFormBlock(data.startDate, data.endDate);
  renderToast(
    {text: `Выбраны даты c ${data.startDate.toLocaleString(DateTime.DATE_MED)} по ${data.endDate.toLocaleString(DateTime.DATE_MED)}`, type: 'success'},
    {name: 'Хорошо', handler: () => {console.log('Уведомление закрыто')}}
  );
  if(Math.floor(Math.random()*100)%2)
    setTimeout(() => callback(null, []), 2000);
  else
    setTimeout(() => callback(new Error('Ошибка!')), 2000);


}

export function renderSearchFormBlock (startDate: DateTime = null, endDate: DateTime = null) {
  const todayDate = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0});
  const maxDate = todayDate.plus({month:1}).endOf('month');
  if(!startDate || startDate < todayDate || startDate > maxDate)
    startDate = todayDate.plus({days: 1});
  if(!endDate || endDate < startDate.plus({days: 1}))
    endDate = startDate.plus({days:2});
  if(endDate > maxDate)
    endDate = maxDate;
  console.log(todayDate.toString(), maxDate.toString());
  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" name="checkin"
                   value="${startDate.toFormat('yyyy-MM-dd')}" 
                   min="${todayDate.toFormat('yyyy-MM-dd')}" 
                   max="${maxDate.toFormat('yyyy-MM-dd')}" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" name="checkout"
                   value="${endDate.toFormat('yyyy-MM-dd')}"
                   min="${startDate.toFormat('yyyy-MM-dd')}"
                   max="${maxDate.toFormat('yyyy-MM-dd')}" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button id="findButton">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
}
