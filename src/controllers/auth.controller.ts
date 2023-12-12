import {Request, Response} from "express";
import userRepository from "../repositories/user.repository";
import {generate} from "rand-token";
import {generateToken, decodeToken} from "../methods/auth.methods";
import {authConfig} from "../config/auth";
import bcrypt from 'bcryptjs';

export async function login(req: Request, res: Response) {
    let username = req.body.username || 'test';
    const password = req.body.password || '123456';
    username = username.toLowerCase()
    const user = await userRepository.getByUsername(username);
    if (!user) {
        return res.status(401).send('Tài khoản không tồn tại.');
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Mật khẩu không chính xác.');
    }
    const dataForAccessToken = {
        username: user.username,
    };
    const accessToken = generateToken(
        dataForAccessToken,
        authConfig.ACCESS_TOKEN_SECRET,
        authConfig.ACCESS_TOKEN_LIFE,
    );
    if (!accessToken) {
        return res.status(401).send('Đăng nhập không thành công.');
    }
    let refreshToken = generate(authConfig.REFRESH_TOKEN_SIZE);
    if (!user.refresh_token) {
        user.refresh_token = refreshToken
        await userRepository.update(user);
    } else {
        refreshToken = user.refresh_token;
    }
    return res.status(200).json({
        accessToken,
        refreshToken,
    });
}

export async function refreshToken(req: Request, res: Response) {
    // Lấy access token từ header
    let accessTokenFromHeader = req.headers.authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).send('Không tìm thấy access token.');
    }
    accessTokenFromHeader = accessTokenFromHeader.split(' ')[1];
    // Lấy refresh token từ body
    const refreshTokenFromBody = req.body.refreshToken;
    if (!refreshTokenFromBody) {
        return res.status(400).send('Không tìm thấy refresh token.');
    }
    // Decode access token đó
    const decoded = decodeToken(
        accessTokenFromHeader,
        authConfig.ACCESS_TOKEN_SECRET,
    );
    if (!decoded) {
        return res.status(400).send('Access token không hợp lệ.');
    }
    const username = decoded.payload.username;
    const user = await userRepository.getByUsername(username);
    if (!user) {
        return res.status(401).send('User không tồn tại.');
    }
    if (refreshTokenFromBody !== user.refresh_token) {
        return res.status(400).send('Refresh token không hợp lệ.');
    }
    // Tạo access token mới
    const dataForAccessToken = { username };
    const accessToken = generateToken(
        dataForAccessToken,
        authConfig.ACCESS_TOKEN_SECRET,
        authConfig.ACCESS_TOKEN_LIFE,
    );
    console.log(accessToken);
    if (!accessToken) {
        return res.status(400).send('Tạo access token không thành công, vui lòng thử lại.');
    }
    return res.json({
        accessToken,
    });
};

export async function register(req: Request, res: Response) {
    const username = req.body.username.toLowerCase();
    const user = await userRepository.getByUsername(username);
    if (user) {
        return res.status(400).json("Tên tài khoản đã tồn tại.");
    } else {
        const salt = bcrypt.genSaltSync();
        const hashPassword = bcrypt.hashSync(req.body.password, salt);
        const newUser = {
            name: req.body.name,
            username: username,
            password: hashPassword
        };
        try {
            const createUser = await userRepository.create(newUser);
            return res.json({
                message: "success",
                data: createUser,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json("Internal Server Error!");
        }
    }
};