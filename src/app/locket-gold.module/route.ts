import { NextResponse } from "next/server";
import { config } from "@/config";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(config.githubRawModuleUrl, {
      // Revalidate every 60 seconds so updates to GitHub RAW are fetched promptly
      next: { revalidate: 60 },
      headers: {
        "User-Agent": "Shadowrocket/2.2.0 (iOS)",
        "Accept": "text/plain, */*",
      },
    });

    if (!response.ok) {
      return new NextResponse(
        `# Error: Failed to fetch module configuration from upstream (Status: ${response.status})\n# Target: ${config.githubRawModuleUrl}`,
        {
          status: response.status === 404 ? 404 : 502,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "X-Content-Type-Options": "nosniff",
            "Cache-Control": "no-cache, no-store, must-revalidate",
          },
        }
      );
    }

    const rawContent = await response.text();

    // Do NOT include Content-Disposition header so browsers render raw text directly
    // instead of prompting to download the file.
    return new NextResponse(rawContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        "Access-Control-Allow-Origin": "*",
        "X-Config-Source": "NSVD-Locket-Gold",
      },
    });
  } catch (error) {
    console.error("Failed to proxy Shadowrocket module config:", error);
    return new NextResponse(
      "# Error: Network or internal error retrieving Shadowrocket module config.\n# Please check your internet connection or try again later.",
      {
        status: 500,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Content-Type-Options": "nosniff",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      }
    );
  }
}

export async function HEAD() {
  const getRes = await GET();
  return new NextResponse(null, {
    status: getRes.status,
    headers: getRes.headers,
  });
}
