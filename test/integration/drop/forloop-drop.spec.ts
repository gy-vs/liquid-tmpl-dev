import { ForloopDrop } from '../../../src/drop/forloop-drop'

describe('drop/forloop-drop', function () {
  it('should support the existing 3-argument constructor', function () {
    const drop = new ForloopDrop(3, 'collection', 'item')
    expect(drop.length).toBe(3)
    expect(drop.name).toBe('item-collection')
    expect(drop.index()).toBe(1)
    expect(drop.index0()).toBe(0)
    expect(drop.first()).toBe(true)
    expect(drop.last()).toBe(false)
    expect(drop.rindex()).toBe(3)
    expect(drop.rindex0()).toBe(2)
  })

  it('should render parentloop as empty for a standalone drop', function () {
    const drop = new ForloopDrop(3, 'collection', 'item')
    expect(drop.parentloop()).toBeNull()
    expect(JSON.parse(drop.valueOf() as string)).toEqual({
      i: 0,
      length: 3,
      name: 'item-collection'
    })
  })

  it('should accept an optional parentloop', function () {
    const parent = new ForloopDrop(2, 'groups', 'group')
    const child = new ForloopDrop(3, 'items', 'item', parent)
    expect(child.parentloop()).toBe(parent)
    parent.next()
    expect(child.parentloop()!.index()).toBe(2)
  })

  it('should not include parentloop in its JSON representation', function () {
    const parent = new ForloopDrop(2, 'groups', 'group')
    const child = new ForloopDrop(3, 'items', 'item', parent)
    const json = JSON.parse(child.valueOf() as string)
    expect(json).toEqual({ i: 0, length: 3, name: 'item-items' })
    expect(json).not.toHaveProperty('parentloop')
  })
})
