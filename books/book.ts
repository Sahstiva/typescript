export class Book {
  name: string
  genre: string
  pageAmount: number
  constructor (name:string, genre:string, pageAmount:number) {
    this.name = name
    this.genre = genre
    this.pageAmount = pageAmount
  }
}
