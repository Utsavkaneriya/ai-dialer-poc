
const MOCK_TRANSCRIPTS = [
    "Hello, I am looking for support with my recent order.",
    "My order number is 12345 and it hasn't arrived yet.",
    "I'm feeling a bit frustrated with the delay.",
    "Oh, thank you for clarifying that, I appreciate the help!"
];

export const getAIInsights = (text: string) => {

    const sentiment = text.includes('frustrated') ? 'Negative' : text.includes('appreciate') ? 'Positive' : 'Neutral';
    const keywords = ["Order", "Support", "Delivery"].filter(word => text.includes(word));

    return {
        sentiment,
        keywords,
        summary: `Customer is asking about ${keywords.join(', ') || 'general queries'}.`
    };
};
