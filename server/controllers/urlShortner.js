import pool from '../db/index.js';
import { codegen } from './codegen.js';
import { logEvent } from '../Logging/loggerr.js';

export const shortTheUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!url) {
      await logEvent("backend", "error", "handler", "Missing URL in request body");
      return res.status(400).json({ error: "URL is required" });
    }

    let finalCode = shortcode;

    if (shortcode) {
      const check = await pool.query('SELECT * FROM shorturls WHERE shortcode = $1', [shortcode]);
      if (check.rows.length > 0) {
        await logEvent("backend", "warn", "db", `Shortcode conflict: ${shortcode}`);
        return res.status(409).json({ error: "Shortcode already in use" });
      }
    } else {
      while (true) {
        const temp = codegen();
        const check = await pool.query('SELECT * FROM shorturls WHERE shortcode = $1', [temp]);
        if (check.rows.length === 0) {
          finalCode = temp;
          break;
        }
      }
    }

    const now = new Date();
    const expiryDate = new Date(now.getTime() + validity * 60000);

    await pool.query(
      `INSERT INTO shorturls (original_url, shortcode, expires_at)
       VALUES ($1, $2, $3)`,
      [url, finalCode, expiryDate]
    );

    await logEvent("backend", "info", "controller", `Short URL created: ${finalCode}`);

    return res.status(201).json({
      shortLink: `${req.protocol}://${req.get('host')}/${finalCode}`,
      expiry: expiryDate.toISOString()
    });

  } catch (err) {
    console.error(err);
    await logEvent("backend", "fatal", "controller", `Error creating short URL: ${err.message}`);
    return res.status(500).json({ error: 'Server Error' });
  }
};

export const getStats = async (req, res) => {
  try {
    const { code } = req.params;

    const urlResult = await pool.query(
      'SELECT * FROM shorturls WHERE shortcode = $1',
      [code]
    );

    if (urlResult.rows.length === 0) {
      await logEvent("backend", "warn", "db", `Stats requested for non-existent shortcode: ${code}`);
      return res.status(404).json({ error: 'Shortcode not found' });
    }

    const urlEntry = urlResult.rows[0];

    const clicks = await pool.query(
      'SELECT clicked_at, referrer, ip_address FROM click_logs WHERE shorturl_id = $1 ORDER BY clicked_at DESC',
      [urlEntry.id]
    );

    const shortLink = `${req.protocol}://${req.get('host')}/${urlEntry.shortcode}`;

    await logEvent("backend", "info", "controller", `Stats fetched for shortcode: ${code}`);

    return res.json({
      originalUrl: urlEntry.original_url,
      shortcode: urlEntry.shortcode,
      shortLink,
      createdAt: urlEntry.created_at,
      expiresAt: urlEntry.expires_at,
      totalClicks: urlEntry.click_count,
      clickDetails: clicks.rows,
    });
  } catch (err) {
    console.error(err);
    await logEvent("backend", "fatal", "controller", `Error fetching stats for shortcode ${req.params.code}: ${err.message}`);
    return res.status(500).json({ error: 'Server Error' });
  }
};
