// Vercel supplies this coarse country header at its edge. No IP, cookie or visit is stored.
export function GET(request) {
  const hint = process.env.VERCEL === '1' ? request.headers.get('x-vercel-ip-country') : null;
  const country = /^[A-Z]{2}$/.test(hint || '') && hint !== 'XX' ? hint : null;
  return Response.json({country}, {headers:{'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
}

// Standalone Vercel Function uses a Web-standard fetch entry point.
export default {
  fetch(request) {
    if (request.method !== 'GET') return new Response(null, {status:405,headers:{Allow:'GET','Cache-Control':'no-store'}});
    return GET(request);
  }
};
