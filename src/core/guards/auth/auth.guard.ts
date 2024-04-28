import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { OpenApiError } from 'src/core/errors/open-api-error';
import { OPEN_API_ERRORS } from 'src/core/errors/open-api.errors';
import { OPEN_API_AUTH } from 'src/core/constants/constants';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/openapi/users/users.service';
import { AuthDetailsObject } from './auth-details-object';
import { User } from 'src/openapi/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromRequest(request);
    const { authorized, user } = await this.checkAPIAuthorization(
      request,
      token,
    );

    const authDetails: AuthDetailsObject = {
      uuid: user.uuid,
      email: user.email,
      org_uuid: user.org_uuid,
      is_org_user: user.is_org_user,
      is_active: user.is_active,
      is_admin: user.is_admin,
      is_org_admin: user.is_org_admin,
      is_customer: user.is_customer,
    };

    request.authDetails = authDetails;

    if (authorized) return true;

    throw new OpenApiError(OPEN_API_ERRORS.FORBIDDEN_ERROR);
  }

  private extractTokenFromRequest(request: Request): string {
    const tokenHeader = OPEN_API_AUTH.TOKEN_HEADER;
    if (
      request.headers[tokenHeader] &&
      (request.headers[tokenHeader] as string).trim()
    ) {
      return request.headers[tokenHeader] as string;
    }
  }

  private async checkAPIAuthorization(request: any, token: string) {
    let authorized = false;
    const decodedToken = this.jwtService.decode(token);
    let user: User;

    if (decodedToken?.email) {
      user = await this.userService.findByEmail(decodedToken?.email);
      if (
        decodedToken?.email === 'admin@test.com' ||
        decodedToken?.email === 'orgadmin@test.com' ||
        decodedToken?.email === 'customer@test.com' ||
        decodedToken?.email === 'test@test.com'
      )
        authorized = true;
    }

    return { authorized, user };
  }
}
