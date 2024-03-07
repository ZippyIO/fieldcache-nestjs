import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const apiKey = request.header('Authorization');

    if (!apiKey) {
      throw new UnauthorizedException('API Key is required');
    }

    if (apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
