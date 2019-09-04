import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './interceptor';

export const httpInterceptorProvider=[
   { provide:HTTP_INTERCEPTORS,useClass:Interceptor,multi:true}
]