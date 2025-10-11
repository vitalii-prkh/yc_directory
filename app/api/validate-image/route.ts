import {NextResponse} from "next/server";

export async function POST(request: Request) {
  try {
    const {url} = await request.json();

    // Try HEAD first, fallback to GET if HEAD is blocked by origin
    const tryFetch = async (method: "HEAD" | "GET") => {
      const res = await fetch(url, {method, redirect: "follow"});
      // Some servers don’t set content-type on HEAD; if missing, you may need GET
      const contentType = res.headers.get("content-type") ?? "";

      return {
        ok: res.ok,
        contentType,
      };
    };

    let {ok, contentType} = await tryFetch("HEAD");

    if (!ok || !contentType) {
      ({ok, contentType} = await tryFetch("GET"));
    }

    const isImage = ok && contentType.toLowerCase().startsWith("image/");

    return NextResponse.json({ok: isImage});
  } catch {
    return NextResponse.json({ok: false}, {status: 400});
  }
}
