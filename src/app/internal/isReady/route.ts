export async function GET() {
	return new Response(JSON.stringify({ isReady: true }));
}
