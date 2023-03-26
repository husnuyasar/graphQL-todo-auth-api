import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/entities/users.entity';
import { AuthService } from './auth.service';
import { CreateUserInput } from './dto/create-user.input';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver(() => Users)
export class AuthResolver {
    constructor(
        private authService : AuthService
    ) {}

    @Query(returns => [Users])
    @UseGuards(JwtAuthGuard)
    async getAll() {
        return this.authService.findAll();
    }

    @Mutation(()=> Users)
    async singUp(@Args('createUserInput') createUserInput : CreateUserInput) {
        return this.authService.create(createUserInput);
    }

    @Mutation(()=> LoginResponse)
    @UseGuards(GqlAuthGuard)
    async login(@Args('username') username : string, @Args('password') password : string) {
        const loginUserInput = new LoginUserInput;
        loginUserInput.username = username;
        loginUserInput.password = password;
        return await this.authService.login(loginUserInput);
    } 
}
