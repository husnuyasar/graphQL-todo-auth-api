import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository : UserRepository
    ) 
    {}


    findAll() : Users [] {
        const users = new Array<Users>();
        const user = new Users;
        user.Id = 1;
        user.FullName = "Hüsnü Yaşar";
        user.Email = "husnuyasar@gmail.com";
        user.Password = "12312"

        const user2 = new Users;
        user2.Id = 2;
        user2.FullName = "Vito Yaşar";
        user2.Email = "yasar58@gmail.com";
        user2.Password = "fffff";
        users.push(user);
        users.push(user2);
        return users;
    }

    async create(dto : CreateUserInput) : Promise<Users> {
        const user = await this.userRepository.get(dto.Email);
        if(user) {
            throw new Error('User already exists!');    
        }

        return await this.userRepository.add(dto);
    }

    async validateUser(email: string, pass: string): Promise<any> {
        try {
            const user = await this.userRepository.get(email);
            if (user && user.Password === pass) {
                const { Password, ...result } = user;
                return result;
            }
        return null;
        } catch (error) {
            console.log(error.message);
        }
        
    }

    async login(dto: LoginUserInput) {
        const payload = { username: dto.username, dto: dto.password };
        const user = await this.userRepository.get(dto.username);
        const { Password, ...result } = user; 
        return {
            access_token: this.jwtService.sign({ username : user.Email, sub: user.Id }),
            user : result
        };
    }
}
