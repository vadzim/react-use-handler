import React from "react"
import { create as createReactRenderer } from "react-test-renderer"

const TestHook = ({ hook, hookArgs = [], onHookResult }) => {
	const hookResult = hook(...hookArgs)
	onHookResult(hookResult)
	return null
}

export const create = hook => {
	let component
	return {
		render(...hookArgs) {
			let result
			component = createReactRenderer(
				<TestHook
					hook={hook}
					hookArgs={hookArgs}
					onHookResult={value => {
						result = value
					}}
				/>,
			)
			return result
		},
		update(...hookArgs) {
			let result
			component.update(
				<TestHook
					hook={hook}
					hookArgs={hookArgs}
					onHookResult={value => {
						result = value
					}}
				/>,
			)
			return result
		},
	}
}
