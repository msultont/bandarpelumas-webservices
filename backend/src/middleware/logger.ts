import { Request, Response, NextFunction } from "express";
import type { UseragentProperties } from "../types";

/**
 * Logs incoming requests with user agent information
 * Logs also show client ip address and timestamp of the request
 *
 * @param req - The incoming request object
 * @param _res - The outgoing response object (unused)
 * @param next - The next middleware function
 */
export function requestLogger(
    req: Request,
    _res: Response,
    next: NextFunction,
): void {
    const { isMobile, isDesktop, isBot, browser }: UseragentProperties =
        req.useragent || {};
    const deviceType = isMobile
        ? "Mobile"
        : isDesktop
          ? "Desktop"
          : isBot
            ? "Bot"
            : "Unknown";

    const convertIPv6ToIPv4 = (ip: string): string => {
        if (ip.startsWith("::ffff:")) {
            return ip.replace(/^.*:/, "");
        }
        return ip;
    };

    const clientIp = convertIPv6ToIPv4(
        req.ip || req.socket?.remoteAddress || "Unknown",
    );

    console.log(
        `Received a ${deviceType} ${req.method} request for ${req.originalUrl} from ${browser || "Unknown"} at ${new Date().toISOString()}

		Client IP: ${clientIp}
		`,
    );

    next();
}
