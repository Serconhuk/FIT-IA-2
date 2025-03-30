export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY;
  const { messages } = req.body;

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages
      })
    });

    const data = await completion.json();
    const reply = data.choices?.[0]?.message?.content || "Sem resposta da IA.";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Erro ao conectar com a IA." });
  }
}