export interface IChat {
    threadId: string,
    messages: {
        role: string,
        content: string
    }[]
}