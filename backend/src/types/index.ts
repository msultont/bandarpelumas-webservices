import type { PostRequestBody, User } from "../schemas";

export type { PostRequestBody, User };

export interface UseragentProperties {
    isMobile?: boolean;
    isDesktop?: boolean;
    isBot?: boolean;
    browser?: string;
    os?: string;
    platform?: string;
}

export interface MessageResponse {
    message: string;
}

export interface UserAgentResponse extends MessageResponse {
    userAgent: UseragentProperties;
}

export interface ErrorResponse {
    error: string;
}

export interface UserCreateResponse {
    message: string;
    id: string;
    user: User;
}
