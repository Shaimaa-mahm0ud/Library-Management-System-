export interface AuthResponse {
    success: boolean;
    message: string;
    token: string;
    user: {
        _id: string;
        name: string;
        email: string;
        role: string;
        createdAt?: string;
    };
}
