import { renderHook } from "@testing-library/react-hooks"
import { useHandler } from "../src"

test("useHandler should return the same instance", () => {
	const testHandler = renderHook(({ cb }) => useHandler(cb), { initialProps: { cb: x => x } })

	const callback = testHandler.result.current

	expect(typeof testHandler.result.current).toBe("function")
	expect(testHandler.result.current(1)).toBe(1)

	testHandler.rerender({ cb: x => x * 2 })

	expect(testHandler.result.current).toBe(callback)
	expect(callback(1)).toBe(2)

	testHandler.rerender({ cb: x => x * 5 })

	expect(testHandler.result.current).toBe(callback)
	expect(callback(1)).toBe(5)
})

test("useHandler should not crash on nullish", () => {
	const testHandler = renderHook(({ cb }) => useHandler(cb), { initialProps: { cb: undefined } })

	const callback = testHandler.result.current

	expect(typeof testHandler.result.current).toBe("function")
	expect(testHandler.result.current(1)).toBe(undefined)

	testHandler.rerender({ cb: x => x * 7 })

	expect(testHandler.result.current).toBe(callback)
	expect(callback(1)).toBe(7)

	testHandler.rerender({ cb: null })

	expect(testHandler.result.current).toBe(callback)
	expect(callback(1)).toBe(undefined)
})

test("useHandler should not crash on updating to nullish", () => {
	const testHandler = renderHook(({ cb }) => useHandler(cb), { initialProps: { cb: x => x * 8 } })

	const callback = testHandler.result.current

	expect(typeof testHandler.result.current).toBe("function")
	expect(testHandler.result.current(1)).toBe(8)

	testHandler.rerender({ cb: undefined })

	expect(testHandler.result.current).toBe(callback)
	expect(callback(1)).toBe(undefined)
})
