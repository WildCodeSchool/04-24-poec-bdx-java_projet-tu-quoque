export type Notes = {
    "id": number;
    "title": string;
    "writerId": number;
    "writerRole": "character" | "user";  // le rôle peut être soit 'character' soit 'user'
    "content": string;
}