import { create } from "./react-hook-test-renderer"
import { useHandler } from "../src"

test("useHandler should return the same instance", () => {
	const testHandler = create(useHandler)

	const callback = testHandler.render(x => x)
	expect(typeof callback).toBe("function")
	expect(callback(1)).toBe(1)

	expect(testHandler.update(x => x * 2)).toBe(callback)
	expect(callback(1)).toBe(2)

	expect(testHandler.update(x => x * 5)).toBe(callback)
	expect(callback(1)).toBe(5)
})

test("useHandler should not crash on nullish", () => {
	const testHandler = create(useHandler)

	const callback = testHandler.render(undefined)
	expect(typeof callback).toBe("function")
	expect(callback(1)).toBe(undefined)

	expect(testHandler.update(x => x * 7)).toBe(callback)
	expect(callback(1)).toBe(7)

	expect(testHandler.update(null)).toBe(callback)
	expect(callback(1)).toBe(undefined)
})

test("useHandler should not crash on updating to nullish", () => {
	const testHandler = create(useHandler)

	const callback = testHandler.render(x => x * 8)
	expect(typeof callback).toBe("function")
	expect(callback(1)).toBe(8)

	expect(testHandler.update(undefined)).toBe(callback)
	expect(callback(1)).toBe(undefined)
})
