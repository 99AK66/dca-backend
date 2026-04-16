export default async function handler(req, res) {
  const { symbol } = req.query;

  try {
    const url = `https://query1.finance.yahoo.com/v7/finance/chart/${symbol}?range=1y&interval=1d`;

    const response = await fetch(url);
    const data = await response.json();

    const prices = data.chart.result[0].indicators.quote[0].close;
    const valid = prices.filter(p => p !== null);

    const first = valid[0];
    const last = valid[valid.length - 1];

    const returnPercent = ((last - first) / first) * 100;

    res.status(200).json({
      symbol,
      return: returnPercent.toFixed(2)
    });

  } catch (err) {
    res.status(500).json({ error: "failed" });
  }
}
