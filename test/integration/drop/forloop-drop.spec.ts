import { ForloopDrop } from '../../../src/drop/forloop-drop'

describe('drop/forloop-drop', function () {
  it('should support constructor without parentloop', function () {
    const forloop = new ForloopDrop(3, 'collection', 'variable')
    expect(forloop.length).toBe(3)
    expect(forloop.name).toBe('variable-collection')
    expect(forloop.parentloop).toBeUndefined()
  })
  it('should expose parentloop when provided', function () {
    const parent = new ForloopDrop(2, 'parents', 'parent')
    const forloop = new ForloopDrop(3, 'items', 'item', parent)
    expect(forloop.parentloop).toBe(parent)
    expect(forloop.parentloop!.length).toBe(2)
    expect(forloop.parentloop!.name).toBe('parent-parents')
  })
  it('should not include parentloop in stringified output', function () {
    const parent = new ForloopDrop(2, 'parents', 'parent')
    const forloop = new ForloopDrop(3, 'items', 'item', parent)
    expect(JSON.stringify(forloop)).toBe('{"i":0,"length":3,"name":"item-items"}')
    expect(forloop.valueOf()).toBe('{"i":0,"length":3,"name":"item-items"}')
    expect(JSON.stringify(parent)).toBe('{"i":0,"length":2,"name":"parent-parents"}')
  })
})
