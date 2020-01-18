import { renderHook } from "@testing-library/react-hooks"
import { useHandler } from "../src/index"

test("check typescript type", () => {
	renderHook(() => {
		// this is just a stub code to let compiler check some types
		const func: (x: number) => string = x => x.toString()

		const handler: (x: number) => string = useHandler(func)

		const handler1 = useHandler(func)
		const x = handler1(1)
		const y: string = x

		if (Math.random() > 2) {
			// this will not be compiled if useHandler returns any
			const n: never = useHandler(() => {
				throw new Error("never")
			})()
			return n
		}

		return [handler, y]
	})
})
