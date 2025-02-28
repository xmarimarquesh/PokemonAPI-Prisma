import { Request, Response, NextFunction } from "express";

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email and password are required' });
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Invalid email format' });
    }
    if (password.length < 6) {
        res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    next(); 
};

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: 'Invalid email format' });
    }

    if (password !== confirmPassword) {
        res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
        res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    next();
};
