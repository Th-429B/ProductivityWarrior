import React from "react";

const quotes = [
    {id: 1, phrase: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill",},
    {id: 2, phrase: "Never bend your head. Always hold it high. Look the world straight in the eye.", author: "Helen Keller",},
    {id: 3, phrase: "Believe you can and you're halfway there.", author: "Theodore Roosevelt",},
    {id: 4, phrase: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.", author: "Jimmy Dean"},
    {id: 5, phrase: "No matter what you're going through, there's a light at the end of the tunnel.", author: "Demi Lovato"},
    {id: 6, phrase: "Nothing is impossible. The word itself says \"I'm possible!\"", author: "Audrey Hepburn"},
    {id: 7, phrase: "You don't always need a plan. Sometimes you just need to breathe, trust, let go and see what happens.", author: "Mandy Hale"},
    {id: 8, phrase: "You are enough just as you are.", author: "Meghan Markle"},
    {id: 9, phrase: "Everything you can imagine is real.", author: "Pablo Picasso"},
    {id: 10, phrase: "If something is important enough, even if the odds are stacked against you, you should still do it.", author: "Elon Musk"},
    {id: 11, phrase: "Magic is believing in yourself. If you can make that happen, you can make anything happen.", author: "Johann Wolfgang Von Goethe"},
    {id: 12, phrase: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein"},
    {id: 13, phrase: "E=MC^2", author: "Albert Einstein"},
    {id: 14, phrase: "Your time is limited, so don’t waste it living someone else’s life. Don’t be trapped by dogma – which is living with the results of other people’s thinking.", author: "Steve Jobs"},
    {id: 15, phrase: "Life is not a problem to be solved, but a reality to be experienced.", author: "Soren Kierkegaard"},
    {id: 16, phrase: "Life imposes things on you that you can’t control, but you still have the choice of how you’re going to live through this.", author: "Celine Dion"},
    {id: 17, phrase: "Keep smiling, because life is a beautiful thing and there’s so much to smile about.", author: "Marilyn Monroe"},
    {id: 18, phrase: "It’s never too late – never too late to start over, never too late to be happy.", author: "Jane Fonda"},
    {id: 19, phrase: "Go confidently in the direction of your dreams.  Live the life you have imagined.", author: "Henry David Thoreau"},
    {id: 20, phrase: "It is never too late to be what you might have been.", author: "George Eliot"},
]

export const getQuote = () => {
    const random = Math.floor(Math.random() * quotes.length);
    const quote = quotes.filter(item => item['id'] === random)[0];
    return quote;
}