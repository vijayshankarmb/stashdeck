import app from "./app";

export const startServer = (PORT: number) => {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}

