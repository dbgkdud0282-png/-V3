import { getStore } from "@netlify/blobs";

const store = getStore("goldenforest-data");
const DATA_KEY = "site-data";

export default async (req: Request) => {
  try {
    // 관리자 저장
    if (req.method === "POST") {
      const data = await req.json();

      await store.setJSON(DATA_KEY, data);

      return Response.json({
        success: true,
      });
    }

    // 사이트에서 데이터 불러오기
    if (req.method === "GET") {
      const data = await store.get(DATA_KEY, {
        type: "json",
        consistency: "strong",
      });

      if (data) {
        return Response.json({
          success: true,
          data,
        });
      }

      return Response.json({
        success: false,
        message: "No server data found",
      });
    }

    return new Response("Method Not Allowed", {
      status: 405,
    });
  } catch (error) {
    console.error("API error:", error);

    return Response.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
};