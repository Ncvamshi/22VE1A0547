import pool from '../db/index.js';

export const handleRedirect = async (req, res) => {
  const { code } = req.params;

  try {
    const result = await pool.query('SELECT * FROM shorturls WHERE shortcode = $1', [code]);
    if (result.rows.length === 0) return res.status(404).send('Shortcode not found');

    const urlEntry = result.rows[0];
    const now = new Date();

    if (now > new Date(urlEntry.expires_at)) {
      return res.status(410).send('Shortcode expired');
    }

    await pool.query('UPDATE shorturls SET click_count = click_count + 1 WHERE id = $1', [urlEntry.id]);
    await pool.query(
      `INSERT INTO click_logs (shorturl_id, referrer, ip_address)
       VALUES ($1, $2, $3)`,
      [urlEntry.id, req.get('referer') || null, req.ip]
    );

    res.redirect(urlEntry.original_url);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};
