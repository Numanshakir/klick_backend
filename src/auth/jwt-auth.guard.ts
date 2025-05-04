// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';

// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}
//   canActivate(context: ExecutionContext) {
//     return super.canActivate(context);
//   }
//   // canActivate(context: ExecutionContext): Promise<boolean> {
//   //   const request = context.switchToHttp().getRequest<Request>();
//   //   const authHeader = request.headers.authorization;

//   //   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//   //     throw new UnauthorizedException('No token provided');
//   //   }

//   //   const token = authHeader.split(' ')[1];

//   //   try {
//   //     const decoded = this.jwtService.verifyAsync<{ id: number }>(token); // ✅ No need for await
//   //     request.user = decoded; // ✅ Assign decoded user to request
//   //     // return true;
//   //     return Promise.resolve(true);
//   //   } catch (error) {
//   //     console.error(error);
//   //     throw new UnauthorizedException('Invalid or expired token');
//   //   }
//   // }
// }
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
