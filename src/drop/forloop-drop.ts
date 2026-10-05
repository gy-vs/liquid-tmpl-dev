import { Drop } from './drop'

export class ForloopDrop extends Drop {
  protected i = 0
  public name: string
  public length: number
  public parentloop?: ForloopDrop
  public constructor (length: number, collection: string, variable: string, parentloop?: ForloopDrop) {
    super()
    this.length = length
    this.name = `${variable}-${collection}`
    // define as non-enumerable so `{{ forloop }}` (JSON.stringify) output stays unchanged
    Object.defineProperty(this, 'parentloop', {
      value: parentloop,
      writable: true,
      enumerable: false,
      configurable: true
    })
  }
  public next () {
    this.i++
  }
  public index0 () {
    return this.i
  }
  public index () {
    return this.i + 1
  }
  public first () {
    return this.i === 0
  }
  public last () {
    return this.i === this.length - 1
  }
  public rindex () {
    return this.length - this.i
  }
  public rindex0 () {
    return this.length - this.i - 1
  }
  public valueOf () {
    return JSON.stringify(this)
  }
}
