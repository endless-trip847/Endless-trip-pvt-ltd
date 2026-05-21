import { pool } from "@/lib/db";
/* =====================================================
   GET /api/packages
   - List all packages (for Manage Packages page)
===================================================== */
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT 
         id,
         title,
         location,
         price,
         days,
         rating,
         badge,
         adults,
         nights,
         rating,
         image_url,
         duration_category,
         package_type,
         created_at
       FROM packages
       ORDER BY created_at DESC`
    );

    return Response.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("GET packages error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

/* =====================================================
   POST /api/packages
   - Create new package
===================================================== */
export async function POST(req) {
  try {
    console.log("inside creating req");
    const body = await req.json();

    const {
      basic,
      itinerary = [],
      hotels = [],
      flights = [],
      visas = [],
      inclusions = [],
      exclusions = [],
      terms_conditions = "",
    } = body;

    /* ---------- 1. INSERT MAIN PACKAGE ---------- */
    const pkgResult = await pool.query(
      `INSERT INTO packages (
        title,
        location,
        description,
        price,
        days,
        nights,
        adults,
        destination_type,
        duration_category,
        package_type,
        rating,
        badge,
        image_url,
        terms_conditions,
        inclusions,
        exclusions
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16
      )
      RETURNING id`,
      [
        basic.title,
        basic.location,
        basic.overview,
        basic.price,
        basic.days,
        basic.nights,
        basic.adults,
        basic.destinationTags,
        basic.duration,
        basic.packageType,
        basic.rating,
        basic.badge,
        basic.image_url || null,
        terms_conditions,
        inclusions.join("\n"),
        exclusions.join("\n"),
      ]
    );

    const packageId = pkgResult.rows[0].id;

    /* ---------- 2. ITINERARY ---------- */
    for (const day of itinerary) {
      await pool.query(
        `INSERT INTO itinerary_details
         (package_id, day_number, title, description)
         VALUES ($1,$2,$3,$4)`,
        [packageId, day.day_number, day.title, day.description]
      );
    }

    /* ---------- 3. HOTELS ---------- */
    for (const hotel of hotels) {
      await pool.query(
        `INSERT INTO hotel_details
         (package_id, hotel_name, city, nights, star_rating, description)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [
          packageId,
          hotel.hotel_name,
          hotel.city,
          hotel.nights,
          hotel.star_rating,
          hotel.description || "",
        ]
      );
    }

    /* ---------- 4. FLIGHTS ---------- */
    for (const flight of flights) {
      await pool.query(
        `INSERT INTO flight_details
         (package_id, type, airline, flight_number, class,
          departure_from, departure_time, arrival_at, arrival_time, description)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          packageId,
          flight.type,
          flight.airline,
          flight.flightNumber,
          flight.flightClass,
          flight.from,
          flight.departureTime || null,
          flight.to,
          flight.arrivalTime || null,
          flight.description || "",
        ]
      );
    }

    /* ---------- 5. VISA ---------- */
    for (const v of visas) {
      await pool.query(
        `INSERT INTO visa_details
         (package_id, country, visa_type, processing_time, fee, requirements, description)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [
          packageId,
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
      message: "Package created successfully",
      packageId,
    });
  } catch (error) {
    console.error("POST package error:", error);
    return Response.json(
      { success: false, message: "Failed to create package" },
      { status: 500 }
    );
  }
}
