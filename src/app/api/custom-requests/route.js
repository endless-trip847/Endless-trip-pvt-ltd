import { pool } from "@/lib/db";

/* =====================================================
   POST /api/custom-requests
   - Create new custom package request (public)
===================================================== */
export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      destination,
      travel_date,
      travelers,
      budget,
      message,
    } = body;

    if (!name || !email || !destination) {
      return Response.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!email.includes("@")) {
      return Response.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO custom_package_requests
       (name, email, phone, destination, travel_date, travelers, budget, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        name,
        email,
        phone,
        destination,
        travel_date || null,
        travelers || null,
        budget || null,
        message || "",
      ]
    );

    return Response.json({
      success: true,
      message: "Request submitted successfully",
    });
  } catch (error) {
    console.error("POST custom request error:", error);
    return Response.json(
      { success: false, message: "Failed to submit request" },
      { status: 500 }
    );
  }
}

/* =====================================================
   GET /api/custom-requests
   - List all custom package requests (admin)
===================================================== */
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT
        id,
        name,
        email,
        phone,
        destination,
        travel_date,
        travelers,
        budget,
        message,
        status,
        request_date
       FROM custom_package_requests
       ORDER BY request_date DESC`
    );

    return Response.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("GET custom requests error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}
