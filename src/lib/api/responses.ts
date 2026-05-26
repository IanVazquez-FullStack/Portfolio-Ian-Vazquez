export type ApiResponse<T = unknown> =
  | { ok: true; data?: T; message?: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export function ok<T>(data?: T, message?: string): Response {
  return Response.json({ ok: true, data, message }, { status: 200 });
}

export function fail(
  error: string,
  fieldErrors?: Record<string, string[]>,
  status = 400
): Response {
  return Response.json({ ok: false, error, fieldErrors }, { status });
}
