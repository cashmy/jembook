import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cells {
    id: string;
    content: string;
    type: 'text' | 'code';
}

interface LocalApiError {
    code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
    const router = express.Router();
    router.use(express.json());

    const fullPath = path.join(dir, filename);

    router.get('/cells', async (req, res) => {
        const isLocalApiError = (err: any): err is LocalApiError => {
            return typeof err.code === "string";
        };

        try {
            // Read the file
            const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
            // Parse the list of cells
            // Send a list of cells back to the browser
            res.send(JSON.parse(result));
        } catch (err) {
            // If read throws an error, 
            // Inspect the error, see if it says that the file doesn't exist
            if (isLocalApiError(err)) {
                if (err.code === "ENOENT") {
                    await fs.writeFile(fullPath, "[]", "utf-8");
                    // Send a list of cells back to the browser
                    res.send([]);
                }
            } else {
                throw err;
            }
        }
    });

    router.post('/cells', async (req, res) => {
        // Take the list of cells from the request object
        // Serialize them
        const { cells }: { cells: Cells[] } = req.body;

        // Write the cells into the cells.json file
        await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

        // Send back a success message
        res.send({ status: 'ok' });
    });

    return router;
}