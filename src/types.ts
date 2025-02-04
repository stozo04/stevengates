export interface LogData {
    date: string;
    anxiety_level: string;
    panic_attack: boolean;
    used_medication: boolean;
    went_to_gym: boolean;
    had_sex: boolean;
    mood: string;
    notes: string;
    user_id: string;
}

export interface User {
    id: string;
    email: string;
    created_at: string;
}

export interface AuthResponse {
    user: User | null;
    error: Error | null;
}

export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
}

export interface PaginationParams {
    page: number;
    limit: number;
}

