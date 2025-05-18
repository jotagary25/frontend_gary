// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // Rutas protegidas
// const protectedRoutes = ["/chat"];

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("__session")?.value; // Firebase guarda sesión en cookies

//   if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
//     return NextResponse.redirect(new URL("/auth", request.url));
//   }

//   return NextResponse.next();
// }

// // Aplicar middleware solo a estas rutas
// export const config = {
//   matcher: ["/chat"],
// };

export const config = {
  matcher: [],
};
