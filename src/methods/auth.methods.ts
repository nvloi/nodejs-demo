import jwt, {JwtPayload} from 'jsonwebtoken';
export function generateToken(payload: any, secretSignature: string, tokenLife: string){
        try {
        return jwt.sign(
            { payload },
            secretSignature,
            { algorithm: 'HS256', expiresIn: tokenLife },
        );
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};
export function verifyToken(token: string, secretKey: any) {
    try {
        return jwt.verify(token, secretKey) as JwtPayload;
    } catch (error) {
        console.log(`Error in verify access token:  + ${error}`);
        return null;
    }
};
export function decodeToken(token: string, secretKey: string) {
    try {
        return jwt.verify(token, secretKey, {
            ignoreExpiration: true,
        }) as JwtPayload;
    } catch (error) {
        console.log(`Error in decode access token: ${error}`);
        return null;
    }
};