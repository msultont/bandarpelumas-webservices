import { Router, Request, Response } from "express";

const router = Router();

interface GoogleReview {
	author_name: string;
	profile_photo_url: string;
	rating: number;
	relative_time_description: string;
	text: string;
	time: number;
}

interface PlacesDetailsResponse {
	status: string;
	result?: {
		reviews?: GoogleReview[];
	};
}

interface CachedReviews {
	data: GoogleReview[];
	fetchedAt: number;
}

let cache: CachedReviews | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

router.get("/reviews", async (_req: Request, res: Response) => {
	const apiKey = process.env.GOOGLE_PLACES_API_KEY;
	const placeId = process.env.GOOGLE_PLACE_ID;

	if (!apiKey || !placeId) {
		res.status(503).json({ error: "Google Places API not configured" });
		return;
	}

	if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
		res.json({ reviews: cache.data, cached: true });
		return;
	}

	try {
		const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=reviews&language=id&key=${apiKey}`;
		const response = await fetch(url);
		const json = (await response.json()) as PlacesDetailsResponse;

		if (json.status !== "OK") {
			res.status(502).json({
				error: "Google Places API error",
				status: json.status,
			});
			return;
		}

		const reviews = json.result?.reviews ?? [];
		cache = { data: reviews, fetchedAt: Date.now() };
		res.json({ reviews, cached: false });
	} catch {
		res.status(502).json({ error: "Failed to fetch reviews" });
	}
});

export default router;
