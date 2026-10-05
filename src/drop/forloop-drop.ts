import { Drop } from './drop'

export class ForloopDrop extends Drop {
  protected i = 0
  public name: string
  public length: number
  public constructor (length: number, collection: string, variable: string, parentloop?: ForloopDrop) {
    super()
    this.length = length
    this.name = `${variable}-${collection}`
    if (parentloop) parentLoops.set(this, parentloop)
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
  /**
   * The forloop of the enclosing `for` loop, or `null` for the outermost loop.
   * `tablerow` loops do not count as an enclosing loop.
   */
  public parentloop () {
    return parentLoops.get(this) ?? null
  }
  public valueOf () {
    return JSON.stringify(this)
  }
}

const parentLoops = new WeakMap<ForloopDrop, ForloopDrop>()
