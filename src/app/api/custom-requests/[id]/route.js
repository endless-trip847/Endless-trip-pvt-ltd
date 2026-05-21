import { pool } from "@/lib/db";

/* =====================================================
   PUT /api/custom-requests/:id
   - Update request status
===================================================== */
export async function PUT(req, context) {
  const { id } = await context.params;

  try {
    const { status } = await req.json();

    if (!["pending", "approved", "rejected"].includes(status)) {
      return Response.json(
        { success: false, message: "Invalid status" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `UPDATE custom_package_requests
       SET status = $1
       WHERE id = $2`,
      [status, id]
    );

    if (result.rowCount === 0) {
      return Response.json(
        { success: false, message: "Request not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.error("PUT custom request error:", error);
    return Response.json(
      { success: false, message: "Failed to update status" },
      { status: 500 }
    );
  }
}
