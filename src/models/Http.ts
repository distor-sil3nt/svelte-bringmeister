export enum HttpStatus {
	success = 'success',
	error = 'error'
}

export type HttpStatusType = `${HttpStatus}`

export type AwaitedPromise<T> = Awaited<Promise<PromiseLike<T>>>
