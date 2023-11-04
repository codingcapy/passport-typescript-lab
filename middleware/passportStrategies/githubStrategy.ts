import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { database } from '../../models/userModel';
import { getUserById } from '../../controllers/userController';

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: "0c7e35d9957c1574c204",
        clientSecret: process.env.CLIENT_SECRET || "",
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },

    /* FIX ME 😭 */
    async (req: Request, accessToken: string, refreshToken: string, profile: any, done: (err?: Error | null, profile?: any) => void) => {
        const user = getUserById(profile.id)
        if (!user) {
            const user = { id: profile.id, name: profile.username }
            database.push(user)
            return done(null, user)
        }
    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
