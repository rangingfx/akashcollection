export const onRequest: PagesFunction = async () => {
  return new Response(JSON.stringify({ status: "ok" }), {
    headers: { "content-type": "application/json" },
  });
};
