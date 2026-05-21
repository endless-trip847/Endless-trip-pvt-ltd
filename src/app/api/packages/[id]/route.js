import { pool } from "@/lib/db";

/* =====================================================
   GET /api/packages/:id
   - Fetch full package (edit mode)
===================================================== */
export async function GET(request, context) {
  const { id } = await context.params;

  try {
    /* ---------- MAIN PACKAGE ---------- */
    const pkgRes = await pool.query(`SELECT * FROM packages WHERE id = $1`, [
      id,
    ]);

    if (pkgRes.rows.length === 0) {
      return Response.json(
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    const pkg = pkgRes.rows[0];

    /* ---------- CHILD TABLES ---------- */
    const [itinerary, hotels, flights, visa] = await Promise.all([
      pool.query(
        `SELECT day_number AS day, title, description
         FROM itinerary_details
         WHERE package_id = $1
         ORDER BY day_number`,
        [id]
      ),
      pool.query(
        `SELECT hotel_name, city, nights, star_rating, description
         FROM hotel_details
         WHERE package_id = $1`,
        [id]
      ),
      pool.query(
        `SELECT type, airline, flight_number, class,
                departure_from, departure_time,
                arrival_at, arrival_time, description
         FROM flight_details
         WHERE package_id = $1`,
        [id]
      ),
      pool.query(
        `SELECT country, visa_type, processing_time,
                fee, requirements, description
         FROM visa_details
         WHERE package_id = $1`,
        [id]
      ),
    ]);

    return Response.json({
      success: true,
      data: {
        basic: pkg,
        itinerary: itinerary.rows,
        hotels: hotels.rows,
        flights: flights.rows,
        visas: visa.rows,

        inclusions: pkg.inclusions ? pkg.inclusions.split("\n") : [],
        exclusions: pkg.exclusions ? pkg.exclusions.split("\n") : [],
      },
    });
  } catch (error) {
    console.error("GET package error:", error);
    return Response.json(
      { success: false, message: "Failed to load package" },
      { status: 500 }
    );
  }
}

/* =====================================================
   PUT /api/packages/:id
   - Update package (delete + reinsert children)
===================================================== */
export async function PUT(req, context) {
  const { id } = await context.params;

  try {
    const body = await req.json();

    const {
      basic,
      itinerary = [],
      hotels = [],
      flights = [],
      visa = [],
      inclusions = [],
      exclusions = [],
      terms_conditions = "",
    } = body;

    /* ---------- 1. UPDATE MAIN PACKAGE ---------- */
    await pool.query(
      `UPDATE packages SET
        title=$1,
        description=$2,
        price=$3,
        days=$4,
        adults=$5,
        destination_type=$6,
        duration_category=$7,
        package_type=$8,
        rating=$9,
        badge=$10,
        image_url=$11,
        terms_conditions=$12,
        exclusions=$13,
        inclusions=$14,
        location=$15,
        nights=$16
       WHERE id=$17`,
      [
        basic.title,
        basic.description,
        basic.price,
        basic.days,
        basic.adults,
        basic.destination_type,
        basic.duration_category,
        basic.package_type,
        basic.rating,
        basic.badge,
        basic.image_url || null,
        terms_conditions,
        exclusions.join("\n"),
        inclusions.join("\n"),
        basic.location,
        basic.nights,
        id,
      ]
    );

    /* ---------- 2. CLEAR CHILD TABLES ---------- */
    await Promise.all([
      pool.query(`DELETE FROM itinerary_details WHERE package_id=$1`, [id]),
      pool.query(`DELETE FROM hotel_details WHERE package_id=$1`, [id]),
      pool.query(`DELETE FROM flight_details WHERE package_id=$1`, [id]),
      pool.query(`DELETE FROM visa_details WHERE package_id=$1`, [id]),
    ]);

    /* ---------- 3. RE-INSERT ITINERARY ---------- */
    for (const day of itinerary) {
      await pool.query(
        `INSERT INTO itinerary_details
         (package_id, day_number, title, description)
         VALUES ($1,$2,$3,$4)`,
        [id, day.day, day.title, day.description]
      );
    }

    /* ---------- 4. HOTELS ---------- */
    for (const h of hotels) {
      await pool.query(
        `INSERT INTO hotel_details
         (package_id, hotel_name, city, nights, star_rating, description)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [id, h.hotel_name, h.city, h.nights, h.star_rating, h.description || ""]
      );
    }

    /* ---------- 5. FLIGHTS ---------- */
    for (const f of flights) {
      await pool.query(
        `INSERT INTO flight_details
         (package_id, type, airline, flight_number, class,
          departure_from, departure_time, arrival_at, arrival_time, description)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          id,
          f.type,
          f.airline,
          f.flight_number,
          f.class,
          f.departure_from,
          f.departure_time || null,
          f.arrival_at,
          f.arrival_time || null,
          f.description || "",
        ]
      );
    }

    /* ---------- 6. VISA ---------- */
    for (const v of visa) {
      await pool.query(
        `INSERT INTO visa_details
         (package_id, country, visa_type, processing_time, fee, requirements, description)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          id,
          v.country,
          v.visa_type,
          v.processing_time,
          v.fee,
          v.requirements || "",
          v.description || "",
        ]
      );
    }

    return Response.json({
      success: true,
      message: "Package updated successfully",
    });
  } catch (error) {
    console.error("PUT package error:", error);
    return Response.json(
      { success: false, message: "Failed to update package" },
      { status: 500 }
    );
  }
}

/* =====================================================
   DELETE /api/packages/:id
   - Delete package + all related data (CASCADE)
===================================================== */
export async function DELETE(request, context) {
  const { id } = await context.params;

  try {
    const result = await pool.query(
      `DELETE FROM packages WHERE id = $1 RETURNING id`,
      [id]
    );

    if (result.rowCount === 0) {
      return Response.json(
        { success: false, message: "Package not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    console.error("DELETE package error:", error);
    return Response.json(
      { success: false, message: "Failed to delete package" },
      { status: 500 }
    );
  }
}
