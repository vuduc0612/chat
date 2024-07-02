import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(map((data) => {
          const result = data.map(({password, avatar, birthday, createdAt, updatedAt, isActive, confirmationCode, fullName, ...user}) => user);
          console.log(result);
          return result;
      }));
  }
}