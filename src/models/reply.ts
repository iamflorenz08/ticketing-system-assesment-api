export interface IReply<T = any> {
    success: boolean,
    message?: string,
    data?: T,
    current_page?: number,
    total_page?: number
}