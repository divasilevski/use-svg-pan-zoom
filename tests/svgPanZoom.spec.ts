import { it, expect, vi } from 'vitest'
import { withSetup } from './test-utils'

type HookReturn = ReturnType<typeof useSvgPanZoom>

const spyWarn = vi.spyOn(global.console, 'warn')
const [result] = withSetup(useSvgPanZoom)
const resultData = result as HookReturn

it('can be created with warn', () => {
  expect(spyWarn).toHaveBeenCalled()
  expect(spyWarn).toHaveBeenCalledWith('Please connect svgRef correctly')
})

it('can be created with svgRef', () => {
  expect(resultData).toHaveProperty('svgRef')
  expect(resultData.svgRef.value).toBeUndefined()
})

it('can be created with properties', () => {
  expect(resultData).toHaveProperty('scale')
  expect(resultData).toHaveProperty('angle')
})

it('can be created with properties', () => {
  expect(resultData).toHaveProperty('scale')
  expect(resultData).toHaveProperty('angle')
})

it('can be created with reset function', () => {
  expect(resultData).toHaveProperty('reset')
  expect(resultData.reset).instanceOf(Function)
})

it('should return the initial scale value equal to 1', () => {
  expect(resultData.scale.value).toBe(1)
})

it('should return the initial angle value equal to 0', () => {
  expect(resultData.angle.value).toBe(0)
})
